interface ICard {
  title: string;
  subtitle: string;
  index: number;
  // imageSrc: string;
}

export default function Card({ title, subtitle, index }: ICard) {
  return (
    <div className='flex flex-row items-center justify-start gap-[22px]'>
      <div className='m-auto flex items-center justify-center w-[51px] h-[51px] p-6 rounded-full bg-[#353A4C] font-bold text-[17px] leading-[20.4px]'>
        {index}
      </div>
      {/* <img src={imageSrc} alt={`${title} Card`} width={95} height={95} /> */}
      <div>
        <h5 className='font-bold text-[17px]'>{title}</h5>
        <p className='text-[#C0C1C5] text-[15px]'>{subtitle}</p>
      </div>
    </div>
  );
}
