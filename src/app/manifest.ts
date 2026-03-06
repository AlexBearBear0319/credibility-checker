import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Credibility Checker',
    short_name: 'TruthCheck',
    description: 'Instantly verify WhatsApp messages and news.',
    start_url: '/',
    display: 'standalone', // This hides the Safari/Chrome URL bar
    background_color: '#ffffff',
    theme_color: '#3b82f6', // Adjust this to match your brand color
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}