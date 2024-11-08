import { Button } from '@/components/ui/button'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 FoodApp. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Button variant="ghost" className="text-gray-300">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="text-gray-300">
              Terms of Service
            </Button>
            <Button variant="ghost" className="text-gray-300">
              Support
            </Button>
          </div>
        </div>
      </footer>
  )
}
