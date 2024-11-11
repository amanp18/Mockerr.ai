"use client";
import React from 'react';
import ParticlesComponent from '@/components/ui/particle';
import Header from './dashboard/_components/header';
import Navbar from './dashboard/_components/Navbar';
import { useUser } from '@clerk/nextjs';
import { AtomIcon, Edit, Share2 } from 'lucide-react';

const LandingPage = () => {
  const { isSignedIn, user } = useUser()
  return (
  <>
      <div className=" relative max-h-full">
        <ParticlesComponent className='inset-0 w-full h-full' />
        {/* Gradient Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 via-gray-800 to-black z-[-1]"></div>

        <Header className=' fixed top-0 w-full p-5' />

        {/* Main Content */}
        <main className=" absolute text-center ml-15 text-white mt-32 px-5">
          <p className='text-2xl font-medium'>{isSignedIn ? `Welcome Back ${user.fullName}` : <>Login to continue</>}</p>
          <h2 className="text-4xl font-semibold mb-4">Elevate Your Interview Skills with Mockify.ai</h2>
          <p className="text-xl mb-6">Get AI-driven mock interviews tailored to your job position and technologies. Rate your performance and improve your answers.</p>
          <a href='/dashboard'><button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-lg">Start Your Mock Interview</button></a>


            <h2 className="mt-12 font-bold text-3xl">How it Works?</h2>
            <h2 className="text-md text-white">Give mock interview in just 3 simple easy step</h2>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <a
                className="block rounded-xl border 
         border-purple-300 p-8 shadow-xl transition
         hover:border-pink-500/10 hover:shadow-pink-500/10"
                href="#"
              >
                <AtomIcon className='h-8 w-8' />

                <h2 className="mt-4 text-xl font-bold text-white">Write promo for your form</h2>

                <p className="mt-1 text-sm text-gray-400">
                Click here to add a brief, engaging promo for our form! Let users know what to expect and why they should fill it out!
                </p>
              </a>

              <a
                className="block rounded-xl border  border-purple-300 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                href="#"
              >
                <Edit className='h-8 w-8' />

                <h2 className="mt-4 text-xl font-bold text-white">Edit Your form </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Click here to edit your form!
                </p>
              </a>

              <a
                className="block rounded-xl border border-purple-300 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                href="#"
              >

                <Share2 className='h-8 w-8' />

                <h2 className="mt-4 text-xl font-bold text-white">Try Premium</h2>

                <p className="mt-1 text-sm text-gray-400">
                  Click here to try the premium version of our AI Mock Interview App!
                </p>
              </a>


            </div>

            <div className="mt-12 text-center">
              <a
                href="/sign-in"
                className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </a>
            </div>
            <div className='mt-16'></div>
        </main>
      </div>
     </>
  );
};

export default LandingPage;
