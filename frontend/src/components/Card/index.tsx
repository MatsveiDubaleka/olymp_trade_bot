import React from 'react';

interface ICard {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export default function Card({ title, subtitle, imageSrc }: ICard) {
  return (
    <div className='max-w-[152px] p-4 rounded-2xl relative flex flex-col gap-1 items-center justify-start bg-[#353A4C]'>
      <img
        className='absolute bottom-[-20%] right-[-10%] rounded-full'
        src={imageSrc}
        alt={`${title} Card`}
        width={44}
        height={44}
      />
      <h5 className='font-bold text-[14px]'>{title}</h5>
      <p className='text-[#C0C1C5] text-[12px]'>{subtitle}</p>
    </div>
  );
}
