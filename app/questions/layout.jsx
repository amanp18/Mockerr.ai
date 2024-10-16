import React from 'react'
import Header from '../dashboard/_components/header'
// import Navbar from './_components/Navbar'

const QuestionsLayout = ({children}) => {
  return (
    <div className=' max-h-full bg-gradient-to-r from-gray-900 via-gray-800 to-black'>
     <Header />
     <div className='mx-5 my-5 md:my-10 lg:mg-15  md:mx-20 lg:mx-36'>
     {children}
     </div>
     {/* <Navbar/> */}
      </div>
  )
}

export default QuestionsLayout