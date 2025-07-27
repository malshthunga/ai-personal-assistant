import React from 'react'
import { Button } from '@/components/ui/button'


//create header for page
function AIAssistants() {
  return (
    <div className='px-10 mt-20 md:px-28 lg:px-36 xl:px-48'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-3xl font-bold'>Welcome to the world of AI Assistants 🤖</h2>
          <p className='text-xl mt-2 '> choose your AI Companion to simplify your Task 🚀</p>
        </div>
        <Button>Continue</Button>
      </div>
        
      </div>
  )
}

export default AIAssistants