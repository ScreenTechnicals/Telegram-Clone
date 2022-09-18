import Image from 'next/image'
import React from 'react'
import LoadingGif from "../public/gifs//Loading.gif"

const Loadng = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen bg-[#161621]'>
        <Image src={LoadingGif} alt="" width={800} height={600} />
    </div>
  )
}

export default Loadng