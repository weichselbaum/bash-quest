'use client'

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'

interface V86TerminalProps {
  onCommand: (command: string, output: string) => void
  onQuestion: (question: string) => void
  onMissionReady?: () => void
  onDiscoveryReady?: (filename: string) => void
  onReady?: () => void
}

export interface V86TerminalRef {
  setupMission: (missionId: string, script: string) => void
  setupDiscovery: (filename: string, content: string) => void
}

const V86Terminal = forwardRef<V86TerminalRef, V86TerminalProps>(({ onCommand, onQuestion, onMissionReady, onDiscoveryReady, onReady }, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useImperativeHandle(ref, () => ({
    setupMission: (missionId: string, script: string) => {
      if (iframeRef.current?.contentWindow) {
        console.log('Sending setup-mission to iframe:', missionId)
        iframeRef.current.contentWindow.postMessage({
          type: 'setup-mission',
          missionId,
          script
        }, '*')
      }
    },
    setupDiscovery: (filename: string, content: string) => {
      if (iframeRef.current?.contentWindow) {
        console.log('Sending setup-discovery to iframe:', filename)
        iframeRef.current.contentWindow.postMessage({
          type: 'setup-discovery',
          filename,
          content
        }, '*')
      }
    }
  }))

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'v86-ready') {
        console.log('v86 ready via iframe')
        setIsLoading(false)
        // Auto-focus iframe so user can type immediately
        setTimeout(() => {
          iframeRef.current?.focus()
        }, 100)
        // Notify parent that terminal is ready
        onReady?.()
      } else if (e.data?.type === 'command-output') {
        console.log('Command output:', e.data.command, e.data.output?.slice(0, 100))
        onCommand(e.data.command, e.data.output || '')
      } else if (e.data?.type === 'user-question') {
        console.log('User question:', e.data.question)
        onQuestion(e.data.question)
      } else if (e.data?.type === 'mission-ready') {
        console.log('Mission ready:', e.data.missionId)
        onMissionReady?.()
      } else if (e.data?.type === 'discovery-ready') {
        console.log('Discovery file ready:', e.data.filename)
        onDiscoveryReady?.(e.data.filename)
      }
    }

    window.addEventListener('message', handleMessage)

    // Fallback: hide loading after 20s
    const fallback = setTimeout(() => {
      setIsLoading(false)
    }, 20000)

    return () => {
      window.removeEventListener('message', handleMessage)
      clearTimeout(fallback)
    }
  }, [onCommand, onQuestion, onMissionReady])

  return (
    <div className="v86-container">
      <div className="v86-screen">
        <iframe
          ref={iframeRef}
          src="/v86/terminal.html"
          className="v86-frame"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: '#000',
          }}
        />
        {isLoading && (
          <div className="v86-loading">
            <p>Loading terminal...</p>
          </div>
        )}
      </div>
    </div>
  )
})

V86Terminal.displayName = 'V86Terminal'

export default V86Terminal
