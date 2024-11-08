import React from 'react'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className="bg-teal-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">FoodApp</h1>
          <nav className="space-x-6">
            <Button variant="ghost" className="text-white">
              Home
            </Button>
            <Button variant="ghost" className="text-white">
              Menu
            </Button>
            <Button variant="ghost" className="text-white">
              Contact
            </Button>
          </nav>
        </div>
      </header>
  )
}
