import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1')

export default defineConfig({
  base: '/Company-webste/',
  plugins: [
    react(),
    {
      name: 'serve-static-assets',
      configureServer(server) {
        server.middlewares.use('/models', (req, res, next) => {
          const filePath = path.resolve(__dirname, 'models', decodeURIComponent(req.url.slice(1)))
          if (fs.existsSync(filePath)) {
            const ext = path.extname(filePath).toLowerCase()
            if (ext === '.glb') res.setHeader('Content-Type', 'model/gltf-binary')
            else if (ext === '.gltf') res.setHeader('Content-Type', 'model/gltf+json')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
        server.middlewares.use('/videos', (req, res, next) => {
          const filePath = path.resolve(__dirname, 'videos', decodeURIComponent(req.url.slice(1)))
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'video/mp4')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
      }
    }
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
