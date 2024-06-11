import clsx from 'clsx';

export default function StepBar({ active }: { active: number }) {
  return (
    <div className='flex flex-row gap-2 items-center justify-center w-full my-5'>
      <div
        className={clsx(
          'w-[11px] h-[11px] rounded-full',
          active === 1 ? 'bg-[#098DF8]' : 'bg-[#4E4E50]',
        )}
      />
      <div
        className={clsx(
          'w-[11px] h-[11px] rounded-full',
          active === 2 ? 'bg-[#098DF8]' : 'bg-[#4E4E50]',
        )}
      />
      <div
        className={clsx(
          'w-[11px] h-[11px] rounded-full',
          active === 3 ? 'bg-[#098DF8]' : 'bg-[#4E4E50]',
        )}
      />
    </div>
  );
}
