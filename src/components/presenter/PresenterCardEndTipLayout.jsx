import Image from 'next/image'
import React from 'react'

const PresenterCardEndTipLayout = ({children,imageurl}) => {
  return (
    <div className='p-3'>
      <div className='flex relative'>
        <Image 
        className='max-w-[200px] h-[182px] absolute left-[-40px] top-[-24px] z-10'
        src={imageurl?imageurl:"/imoje-charecters/Raven-Stop.png"}
        width={400}
        height={450}
        alt='Raven Stop'
        />
        <div className='bg-white w-[40px] h-[40px] absolute left-[32px]'></div>
        <div className='bg-white text-ui-dark-gray w-[315px] h-[136px] relative left-[65px] rounded-sm'>
          <div className='ml-[56px] px-2 py-2 flex flex-col justify-evenly h-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresenterCardEndTipLayout