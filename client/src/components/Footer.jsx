import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container style={{ borderTop: "8px solid #14b8a6" }}> {/* Teal-500 */}
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <Link to="/" className="flex items-center space-x-2 px-0 text-lg">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-md shadow-md inline-flex items-center">
            Nik's
            </span>
            <span className="text-black dark:text-white font-bold text-lg">Blog</span>
            </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
                <Footer.Title title='About'/>
                <Footer.LinkGroup col>
                    <Footer.Link
                       href='https://www.100jsprojects.com'
                       target='_blank'
                       rel='noopener noreferrer'
                    >
                        100 JS Projects
                    </Footer.Link>
                    <Footer.Link
                       href='/about'
                       target='_blank'
                       rel='noopener noreferrer'
                    >
                        Nik's Blog
                    </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Follow us'/>
                <Footer.LinkGroup col>
                    <Footer.Link
                       href='https://www.github.com/Nikhil-953'
                       target='_blank'
                       rel='noopener noreferrer'
                    >
                        Github
                    </Footer.Link>
                    <Footer.Link
                       href='#'
                    >
                        Discord
                    </Footer.Link>
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Legal'/>
                <Footer.LinkGroup col>
                    <Footer.Link
                       href='#'
                    >
                        Privacy Policy
                    </Footer.Link>
                    <Footer.Link href='#'>
                        Terms &amp; Conditions
                    </Footer.Link>
                </Footer.LinkGroup>
                </div>
            </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-centre sm:justify-between'>
            <Footer.Copyright
             href='#' 
             by=" Nik's Blog"
             year={new Date().getFullYear()}        
             />
             <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <Footer.Icon href='#' icon={BsFacebook} />
                <Footer.Icon href='#' icon={BsInstagram} />
                <Footer.Icon href='#' icon={BsTwitter} /> 
                <Footer.Icon href='https://www.github.com/Nikhil-953' icon={BsGithub} />
                <Footer.Icon href='#' icon={BsDribbble} />
             </div>
        </div>
      </div>
    </Footer>
  );
}
