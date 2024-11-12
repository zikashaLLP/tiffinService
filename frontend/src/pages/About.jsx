import Header from '@/components/Header'
import React from 'react'
import Footer from './Footer'
import AboutUs from '@/components/AboutUs'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="container mx-auto flex-grow">
        <AboutUs/>
      </main>

      <Footer />
    </div>
  )
}
