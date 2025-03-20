import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className="h-screen max-w-lg mx-auto p-3 w-full">
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md rounded-full bg-white'>
        <img src={currentUser.profilePicture}
         alt="user"
         className="rounded-full w-full h-full object-cover"
         style={{
         border: "5px solid #d1d5db", // Tailwind's gray-300 color
         borderRadius: "50%",
         }}/>
        </div>
        <TextInput type='text' id='username' placeholder='username'
        defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email'
        defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
       <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
       </div>
    </div> 
  );
}
