import { useEffect, useState } from 'react';
import StepBar from '../../components/StepBar';
import Button from '../../components/Button';
import Langs from '../../assets/langs/index';
import Detection from '../../components/Icons/Detection';
import Card from '../../components/Card';
import { LangsType } from '../../types';

export default function App() {
  const [lang, setLang] = useState<LangsType>('en');
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const TG = window?.Telegram?.WebApp;

    if (TG) {
      TG?.expand();
      TG?.enableClosingConfirmation();
    }

    const USER_DATA = TG?.initDataUnsafe?.user;
    const USER_LANGUAGE = USER_DATA?.language_code;

    if (TG && USER_LANGUAGE) {
      if (
        USER_LANGUAGE === 'en' ||
        USER_LANGUAGE === 'es' ||
        USER_LANGUAGE === 'ms' ||
        USER_LANGUAGE === 'pt-br'
      ) {
        setLang(USER_LANGUAGE);
      } else {
        setLang('en');
      }
    }

    // TODO: Return bellow code
    // const isOnboardingPassed = localStorage.getItem(
    //   'isOnboardingPassed',
    // ) as string;

    // if (isOnboardingPassed) {
    //   followLink(USER_LANGUAGE);
    // }

    setTimeout(() => {
      setStep(1);
    }, 2000);
  }, []);

  const followLink = (locale: LangsType) => {
    if (locale === 'pt-br') {
      window.location.assign(`https://qxbroker.com/pt/sign-up?lid=666838/`);
    } else if (locale === 'es' || locale === 'ms') {
      window.location.assign(
        `https://qxbroker.com/${locale}/sign-up?lid=666838/`,
      );
    } else {
      window.location.assign(`https://qxbroker.com/en/sign-up?lid=666838/`);
    }
  };

  const THIRD_SECTION_DATA = [
    {
      title: 'Fatima Khan',
      subtitle: Langs[lang].fist_card_title,
      imageSrc: '/images/icons/first_user.png',
    },
    {
      title: 'Tatsuya Wang',
      subtitle: Langs[lang].second_card_title,
      imageSrc: '/images/icons/second_user.png',
    },
    {
      title: 'Alexander Müller',
      subtitle: Langs[lang].third_card_title,
      imageSrc: '/images/icons/third_user.png',
    },
    {
      title: 'Samuel Wilson',
      subtitle: Langs[lang].fourth_card_title,
      imageSrc: '/images/icons/fourth_user.png',
    },
    {
      title: 'Andrew Perez',
      subtitle: Langs[lang].fifth_card_title,
      imageSrc: '/images/icons/fifth_user.png',
    },
  ];

  const handleBtnClick = () => {
    if (step === 3) {
      localStorage.setItem('isOnboardingPassed', 'true');
      followLink(lang);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className='relative flex flex-col items-center justify-start w-full h-full max-h-screen text-white overflow-x-hidden bg-cover'>
      <h1 className='w-full py-3 font-semibold text-[17px] text-center'>
        Olymp trade
      </h1>

      {step === 0 && (
        <div className='mt-[-10vh] h-full flex items-center justify-center w-full'>
          <img src='/logo.svg' alt='logotype' width={57} height={57} />{' '}
        </div>
      )}

      {step === 1 && (
        <div className='w-full h-full flex flex-col items-center justify-end max-w-[300px] text-center mb-5'>
          <img
            src='/images/svg/tokens.png'
            className='w-[100vw] max-w-[100vw] object-contain max-h-[400px]'
            alt='Tokens'
          />
          <h2 className='font-bold text-2xl mx-[25px] z-20'>
            {Langs[lang].effective_trading}
          </h2>
          <p className='text-[#C0C1C5] z-20'>{Langs[lang].analyze_trading}</p>
        </div>
      )}

      {step === 2 && (
        <div className='w-full h-full flex flex-col items-center justify-end max-w-[300px] text-center mb-5'>
          <Detection />
          <h2 className='font-bold text-2xl mt-[25%] mx-[25px] z-[30]'>
            {Langs[lang].trading_signals}
          </h2>
          <p className='text-[#C0C1C5]'>{Langs[lang].signal_analytics}</p>
        </div>
      )}

      {step === 3 && (
        <div className='w-full h-full flex flex-col items-center justify-end text-center max-w-[375px] mb-2'>
          <div className='flex flex-row justify-between items-center flex-wrap gap-[27px] px-4'>
            <div className='max-w-[152px] m-auto'>
              <h5 className='text-[20px] font-bold w-[100px] text-left leading-[130%]'>
                {Langs[lang].card_main_title}
              </h5>
            </div>
            {THIRD_SECTION_DATA.map(data => {
              return (
                <Card
                  title={data.title}
                  subtitle={data.subtitle}
                  imageSrc={data.imageSrc}
                />
              );
            })}
          </div>
          <h2 className='font-bold text-2xl mt-[5%] mx-[25px] z-[30]'>
            {Langs[lang].your_opinion}
          </h2>
          <p className='text-[#C0C1C5] text-center'>
            {Langs[lang].carefully_review}
          </p>
        </div>
      )}

      {step > 0 && (
        <div className='flex flex-col items-center justify-center w-full z-10 mb-5'>
          <StepBar active={step} />
          <Button title={Langs[lang].next} onClick={handleBtnClick} />
        </div>
      )}
    </div>
  );
}
