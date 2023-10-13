import Image from 'next/image'
import React from 'react'

const AudienceCardLayout = ({children,imageurl}) => {
  return (
    <div className='p-3'>
      <div className='flex relative'>
        <Image 
        className='max-w-[210px] absolute left-[-10px] top-[-44px] z-10'
        src={imageurl?imageurl:"/imoje-charecters/raven-prof.png"}
        width={400}
        height={450}
        alt='Raven Stop'
        />
        <div className='bg-white text-ui-dark-gray w-[330px] h-[118px] relative left-[50px] rounded-tl-md rounded-bl-md'>
          
        </div>
        <div className='bg-transparent text-ui-dark-gray w-[330px] h-[118px] absolute left-[50px] rounded-tl-md rounded-bl-md z-20'>
          <div className='ml-[70px] px-2 py-2 flex flex-col justify-between h-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudienceCardLayout