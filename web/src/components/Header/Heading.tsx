import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="bg-gradient-to-b from-gray-600 via-gray-200 to-gray-400 text-transparent bg-clip-text text-center w-full mx-auto md:text-[2.0rem]  font-bold">
      {children}
    </h1>
  );
};
