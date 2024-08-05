import React from 'react';
import { Heading } from './Header/Heading';
const Header = () => {
  return (
<div >
<div className='flex bg-gradient-to-t from-slate-800 to-stone-900 font-sans text-white h-20 text-lg items-center'>
<Heading>Task Board</Heading>
</div>
</div>
  );
};

export default Header;
