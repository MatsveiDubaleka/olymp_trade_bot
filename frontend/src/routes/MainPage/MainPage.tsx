import { useEffect, useState } from 'react';
import Card from '../../components/Card/MainCard';
import StepBar from '../../components/StepBar';
import Button from '../../components/Button';
import Langs from '../../assets/langs/main';
import { LangsType } from '../../types';
import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker';
import ReactGA from 'react-ga4';
const REDIRECT_URL = 'REACT_APP_REDIRECT_URL_PLACEHOLDER';
const LID = 'REACT_APP_LID';
const GOOGLE_TOKEN = 'REACT_APP_GOOGLE_TOKEN';

ReactGA.initialize(GOOGLE_TOKEN);
export default function App() {
  const [lang, setLang] = useState<LangsType>('en');
  const [step, setStep] = useState<number>(0);
  const gaEventTracker = useAnalyticsEventTracker('Test Quotex Trade Bot');

  console.log('REDIRECT_URL', REDIRECT_URL);
  console.log('LID', LID);
  console.log('GOOGLE_TOKEN', GOOGLE_TOKEN);

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

    if (TG && USER_DATA?.id) createAnalytics(USER_DATA?.id, 'open_app');

    const isOnboardingPassed = localStorage.getItem(
      'isOnboardingPassed',
    ) as string;

    if (isOnboardingPassed) {
      setTimeout(() => {
        followLink(USER_LANGUAGE);
      }, 1000);
    }

    setTimeout(() => {
      setStep(1);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAnalytics = async (
    userId: number,
    event: 'start' | 'open_app',
  ) => {
    gaEventTracker(event + ' userId:' + userId);
  };

  const followLink = (locale: LangsType) => {
    if (locale === 'pt-br') {
      window.location.assign(`${REDIRECT_URL}/pt/sign-up?lid=${LID}`);
    } else if (locale === 'es' || locale === 'ms') {
      window.location.assign(`${REDIRECT_URL}/${locale}/sign-up?lid=${LID}`);
    } else {
      window.location.assign(`${REDIRECT_URL}/en/sign-up?lid=${LID}`);
    }
  };

  const THIRD_SECTION_DATA = [
    {
      title: Langs[lang].sign_up,
      subtitle: Langs['en'].open_account,
      imageSrc: '/images/icons/ThirdCard_First.png',
    },
    {
      title: Langs[lang].practice,
      subtitle: Langs['en'].get_skills,
      imageSrc: '/images/icons/ThirdCard_Second.png',
    },
    {
      title: Langs[lang].deposit_trade,
      subtitle: Langs['en'].over_instruments,
      imageSrc: '/images/icons/ThirdCard_Third.png',
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
    <div className='relative flex flex-col items-center justify-between w-full h-full text-white bg-cover bg-[#0E0F12]'>
      <div className='w-full flex flex-col items-center justify-center gap-5'>
        <h1 className='w-full py-3 font-semibold text-[17px] text-center'>
          Olymp trade
        </h1>
        {step === 1 && (
          <div className='mt-2 relative w-full h-full flex flex-col items-center justify-center max-w-[320px] text-center gap-2'>
            <h2 className='font-bold text-center text-2xl mx-[25px] z-20'>
              Profitability on the rise
            </h2>
            <p className='text-[#C0C1C5] z-20 text-center'>
              Register and get $10,000 on a demo account for learning to trade
            </p>
          </div>
        )}
        {step === 2 && (
          <div className='mt-2 relative w-full h-full flex flex-col items-center justify-center max-w-[300px] text-center gap-2'>
            <h2 className='font-bold text-2xl mx-[25px] z-[30]'>
              {Langs['en'].user_testimonials}
            </h2>
            <p className='text-[#C0C1C5]'>{Langs['en'].join_quotex}</p>
          </div>
        )}
      </div>

      {step === 0 && (
        <div className='mt-[-10vh] flex items-center justify-center h-full w-full'>
          <img src='/logo.svg' alt='logotype' width={194} height={24} />
        </div>
      )}

      {step === 1 && (
        <div className='w-full flex flex-col items-center justify-center max-w-[300px] text-cente gap-5'>
          <img
            src={`/images/png/en/1.png`}
            alt='First'
            width={312}
            height={192}
          />
        </div>
      )}

      {step === 2 && (
        <div className='w-full h-full flex flex-col items-center justify-center text-center gap-10'>
          <img
            src={`/images/png/en/2.png`}
            alt='Second'
            width={312}
            height={192}
          />
        </div>
      )}

      {step === 3 && (
        <div className='px-5 mt-5 w-full h-full flex flex-col items-center justify-start gap-[32px]'>
          {THIRD_SECTION_DATA.map((data, index) => {
            return (
              <Card title={data.title} subtitle={data.subtitle} index={index} />
            );
          })}
        </div>
      )}

      {step > 0 && (
        <div className='flex flex-col items-center justify-center w-full z-10 pb-5'>
          <StepBar active={step} />
          <Button title={Langs[lang].continue} onClick={handleBtnClick} />
        </div>
      )}
    </div>
  );
}
