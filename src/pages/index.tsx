import React from 'react';

import { Header } from './components/header';
import {Vehicle} from './components/vehicle';

export default function Home() {
  return (
    <main>
      <h1 className='p-10 text-4xl bg-lime-500 text-white'>Welcome</h1>
      <div >
      <button onClick={Header} className=' bg-lime-500 rounded-8xl m-5 '><a className='text-black' href="http://localhost:3000/components/header">owner list</a></button>
      <button onClick={Vehicle} className=' bg-lime-500 rounded-8xl'><a className='text-black' href="http://localhost:3000/components/vehicle">vehicle list</a></button>
      </div>
      
    </main>
  );
}
