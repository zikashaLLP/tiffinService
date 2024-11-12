import Header from '@/components/Header'
import React from 'react'
import Footer from './Footer'
import Contact from '@/components/Contact'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="container mx-auto flex-grow">
        <Contact/>
      </main>

      <Footer />
    </div>
  )
}
