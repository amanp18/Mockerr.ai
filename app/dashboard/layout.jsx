import React from 'react'
import Header from './_components/header'

const DashboardLayout = ({children}) => {
  return (
    <div>
     <Header />
     <div className='mx-5 my-5 md:my-10 lg:mg-15  md:mx-20 lg:mx-36'>
     {children}
     </div>
      </div>
  )
}

export default DashboardLayout