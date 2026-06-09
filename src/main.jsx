import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { err: null } }
  static getDerivedStateFromError(err) { return { err } }
  render() {
    if (this.state.err) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#06060F',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', fontFamily: 'monospace', color: '#F1F5F9',
          padding: 32, gap: 16
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h2 style={{ color: '#FF6B6B', margin: 0 }}>Runtime Error</h2>
          <pre style={{
            background: '#11111F', border: '1px solid rgba(255,107,107,0.3)',
            borderRadius: 12, padding: '16px 24px', maxWidth: 700, width: '100%',
            overflow: 'auto', fontSize: 13, color: '#FF9F9F', whiteSpace: 'pre-wrap'
          }}>
            {this.state.err?.message}
            {'\n\n'}
            {this.state.err?.stack}
          </pre>
          <button onClick={() => window.location.reload()}
            style={{ background: '#ffffff', color: '#000000', border: 'none',
              borderRadius: 10, padding: '10px 24px', cursor: 'pointer', fontSize: 14 }}>
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
