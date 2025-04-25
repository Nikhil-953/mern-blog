import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500
    justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScript Projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl
            rounded-bl-none'>
                <a href="https://www.freecodecamp.org/news/100-javascript-projects-for-beginners/" target='_blank'
                rl='noopener noreferer'>Get Started</a>
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://imgs.search.brave.com/uyjLMKFn2Z8XpCXLYCXRlfl1bfEBIT1D0a_WjB5LK_M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NDI3MTg3OC9waG90/by9qYXZhc2NyaXB0/LWluc2NyaXB0aW9u/LWFnYWluc3QtbGFw/dG9wLWFuZC1jb2Rl/LWJhY2tncm91bmQt/bGVhcm4tamF2YXNj/cmlwdC1wcm9ncmFt/bWluZy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9SDlGSTVY/M1pCUUl5RWlqdmhK/Yy1qdjVNY3dDaC1C/eHFRUHhlZTlBb2Ew/OD0" 
            />
        </div>
    </div>
  )
}
