import { Button, Select,TextInput,FileInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const CreatePost = () => {
  return <div className=''p-3 max-w-3xl mx-auto min-h-screen>
    <h1 className='text-center font-semibold text-3xl my-7'>Create Post</h1>
    <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title'
             className='flex-1'/>
             <Select>
                <option value="uncategorized">Select a category</option>
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>Data Science</option>
                <option>Machine Learning</option>
                <option>Artificial Intelligence</option>
                <option>Cloud Computing</option>
             </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4
        border-teal-500 border-dotted p-3'>
            <FileInput type='file' accept='image/*'/>
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm'
            outline>Upload image</Button>  

        </div>
        <ReactQuill theme="snow" className='h-72 mb-12' placeholder='Write your post here...' required/>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
    </form>
    </div>
  
}

export default CreatePost