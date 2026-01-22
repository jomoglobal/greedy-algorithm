import './globals.css'

export const metadata = {
  title: 'Greedy Coin Change Visualizer',
  description: 'An interactive visualization of the greedy coin change algorithm',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
