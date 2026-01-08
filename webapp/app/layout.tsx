import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bash Quest',
  description: 'Learn bash through Socratic dialogue',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
