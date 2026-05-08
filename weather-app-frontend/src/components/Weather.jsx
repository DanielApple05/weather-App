import React from 'react';
// import Logo from '/logo.svg'


const Weather = () => {
  return (
    <div>
      <div className=' bg-[#050620] h-screen text-gray-300 p-10 '>
        <div className='flex justify-between '>
          <div>
            <img src='/images/logo.svg' alt="" />
          </div>
          <div className='flex items-center justify-center bg-[#2F2D52] p-2 rounded-lg gap-2'>
            <img src="/images/icon-units.svg" alt="" />
            <p>
              Units
            </p>
            <img src="/images/icon-dropdown.svg" alt="" />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-10'>
          <h1 className='text-[35px]'>
            How's the sky looking today?
          </h1>
          <div className='flex gap-5 w-6/12 '>
            <div className='flex bg-[#2F2D52] items-center p-3 rounded-lg flex-1 '>
              <img src="/images/icon-search.svg" alt="" className='w-5' />
              <input type="text" className='outline-none' placeholder='Search for a place...' />
            </div>
            <div>
              <p className='p-3 bg-[#030578] rounded-lg'>
                Search
              </p>
            </div>
          </div>
        </div>
        <div className='flex mt-20 justify-between '>
          <div className='w-7/12 grid gap-5 '>
            <div className='flex justify-between items-center p-8 rounded-2xl bg-cover h-full bg-no-repeat' style={{ background: 'url(/images/bg-today-large.svg)'}} >
              <div className=''>
                <p>Location</p>
                <p>current date</p>
              </div>
              <div className='flex items-center'>
                <img src="/images/icon-sunny.webp" alt="" className='w-15' />
                <p>degree</p>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='grid bg-[#2F2D52] w-35 p-5 rounded-lg gap-2 '>
                <span> Feels Like</span>
                <span>0000</span>
              </div>
              <div className='grid bg-[#2F2D52] w-35 p-5 rounded-lg gap-2'>
                <span> Humidity</span>
                <span>percentage</span>
              </div>
              <div className='grid bg-[#2F2D52] w-35 p-5 rounded-lg gap-2 '>
                <span> Wind</span>
                <span>distance</span>
              </div>
              <div className='grid bg-[#2F2D52] w-35 p-5 rounded-lg gap-2 '>
                <span> precipitation</span>
                <span>mm</span>
              </div>
            </div>
            <div className='flex'>
              <p>Daily forecast</p>
              <div>
              days of the week
              </div>
            </div>
          </div>
          <div className='w-4/12 flex flex-col items-center'>
            <div className='flex items-center'>
              <p>Hourly forecast</p>
              <div className='flex p-2 items-center bg-[#3B3966] gap-2 rounded-lg'>
                <p>Days</p>
                <img src="/images/icon-dropdown.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
