import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      {
        name: 'api-emails-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/emails')) {
              let body = {}
              if (req.method === 'POST' || req.method === 'DELETE') {
                body = await new Promise((resolve) => {
                  let data = ''
                  req.on('data', chunk => data += chunk)
                  req.on('end', () => {
                    try {
                      resolve(JSON.parse(data))
                    } catch {
                      resolve({})
                    }
                  })
                })
              }

              const vercelReq = {
                method: req.method,
                headers: req.headers,
                body,
                query: Object.fromEntries(new URL(req.url, 'http://localhost').searchParams)
              }

              const vercelRes = {
                status(code: number) {
                  res.statusCode = code
                  return this
                },
                json(data: any) {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                  return this
                },
                setHeader(name: string, value: any) {
                  res.setHeader(name, value)
                  return this
                },
                end(data: any) {
                  res.end(data)
                  return this
                }
              }

              try {
                const { default: handler } = await import('../api/emails.js')
                await handler(vercelReq, vercelRes)
              } catch (err: any) {
                console.error('Error in dev server emails middleware:', err)
                res.statusCode = 500
                res.end(JSON.stringify({ error: err?.message || String(err) }))
              }
              return
            }
            next()
          })
        }
      }
    ],
    server: {
      proxy: {
        '/api/run': {
          target: env.VITE_EXECUTION_API_URL ? new URL(env.VITE_EXECUTION_API_URL).origin : 'http://136.111.214.182:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/run/, '/run'),
          configure: (proxy, options) => {
             if (env.VITE_EXECUTION_API_KEY) {
               proxy.on('proxyReq', (proxyReq, req, res) => {
                 proxyReq.setHeader('x-api-key', env.VITE_EXECUTION_API_KEY)
               })
             }
          }
        }
      }
    },
    ssr: {
      noExternal: [
        'monaco-editor',
        'popmotion',
        'style-value-types',
        'unhead',
        '@unhead/vue',
        '@floating-ui/core',
        '@vueuse/core',
        '@slidev/parser',
        '@slidev/client'
      ]
    }
  }
})
