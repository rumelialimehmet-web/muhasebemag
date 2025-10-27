'use client'

import { useState } from 'react'

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>('checking...')

  // Check backend health
  const checkBackend = async () => {
    try {
      const response = await fetch('http://localhost:8000/health')
      const data = await response.json()
      setApiStatus(data.status === 'healthy' ? '✅ Connected' : '❌ Error')
    } catch (error) {
      setApiStatus('❌ Backend not running')
    }
  }

  useState(() => {
    checkBackend()
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-12 border border-purple-100">
          <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Smart Lodge Budget
          </h1>
          <p className="text-center text-gray-600 mb-8 text-xl">
            AI-Powered Financial Analysis Platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <h3 className="font-bold text-lg mb-2 text-purple-900">🎯 Sprint 0: Foundation</h3>
              <p className="text-sm text-purple-700">
                Monorepo structure, FastAPI backend, Next.js frontend, Docker setup
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <h3 className="font-bold text-lg mb-2 text-blue-900">🚀 Status</h3>
              <p className="text-sm text-blue-700">
                Backend API: <span className="font-bold">{apiStatus}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-2">✨ Ready for Development!</h2>
              <p className="text-purple-100">
                Next: Sprint 1 - PDF Processing Engine
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <a 
                href="http://localhost:8000/docs" 
                target="_blank"
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition"
              >
                📚 API Docs
              </a>
              <a 
                href="http://localhost:8000/health" 
                target="_blank"
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
              >
                🏥 Health Check
              </a>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-sm mb-2">📋 Next Steps:</h3>
            <ul className="text-xs space-y-1 text-gray-600">
              <li>✅ Monorepo structure created</li>
              <li>✅ FastAPI backend setup</li>
              <li>✅ Next.js 14 frontend setup</li>
              <li>⏳ Docker Compose configuration</li>
              <li>⏳ PostgreSQL & Redis setup</li>
              <li>⏳ First integration test</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
