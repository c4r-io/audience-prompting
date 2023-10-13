import Image from 'next/image'
import React from 'react'

const PresenterCardLayout = ({children,imageurl}) => {
  return (
    <div className='p-3'>
      <div className='flex relative'>
        <Image 
        className='max-w-[200px] absolute left-[-40px] top-[-41px] z-10'
        src={imageurl?imageurl:"/imoje-charecters/Raven-Stop.png"}
        width={400}
        height={450}
        alt='Raven Stop'
        />
        <div className='bg-white text-ui-dark-gray w-[330px] h-[118px] relative left-[50px] rounded-tl-md rounded-bl-md rounded-tr-sm rounded-br-sm'>
          <div className='ml-[70px] px-2 py-2 flex flex-col justify-between h-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresenterCardLayout