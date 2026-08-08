import { apiClient } from './apiClient'
import { scriptedReply } from './chatKnowledge'

/**
 * One send function, two brains.
 *
 * Tries the Claude-backed endpoint; falls back to the scripted knowledge base
 * on any failure — no key configured, backend not deployed, rate limited,
 * network down. The visitor always gets an answer, so there is no error state
 * to design for.
 */

let aiAvailable = null // null = not yet checked

/** Probes the backend once per page load. Never throws. */
export async function probeAI() {
  if (aiAvailable !== null) return aiAvailable
  try {
    const status = await apiClient.request('/chat', { method: 'GET' })
    aiAvailable = Boolean(status?.ready)
  } catch {
    aiAvailable = false
  }
  return aiAvailable
}

/**
 * @param {{role: 'user'|'assistant', content: string}[]} history
 *        Full transcript including the new user message as the last entry.
 * @returns {Promise<{content: string, chips: string[], source: 'claude'|'scripted'}>}
 */
export async function sendMessage(history) {
  const latest = history[history.length - 1]?.content ?? ''
  const fallback = () => ({ ...scriptedReply(latest), source: 'scripted' })

  if (aiAvailable === false) return fallback()

  try {
    const data = await apiClient.request('/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: history.map(({ role, content }) => ({ role, content })),
      }),
    })
    if (!data?.reply) return fallback()
    return { content: data.reply, chips: [], source: 'claude' }
  } catch {
    // apiClient throws on any non-2xx. Every failure mode here — 503, 429,
    // offline — means the same thing to the visitor: use the scripted answer.
    return fallback()
  }
}
