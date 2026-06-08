import './globals.css'

export const metadata = {
  title: 'Consistencia sin Culpa',
  description: 'Pequeños pasos también construyen grandes sueños.',
  manifest: '/manifest.json',
  themeColor: '#eb4193',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Consistencia',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Consistencia" />
      </head>
      <body>{children}</body>
    </html>
  )
}
