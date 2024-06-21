import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';
import Lang from './locales/main';
import axios from 'axios';
dotenv.config({ path: '../.env' });

const token = process.env.BOT_TOKEN || 'not_exist';
const webAppUrl = process.env.WEB_APP_URL || 'not_exist';

export type LangsType = 'en' | 'es' | 'pt-br' | 'ms';

let USER_LANG_CODE: LangsType = 'en';

const bot = new Telegraf(token);
let USER_ID: number = 0;

const createAnalytics = async (userId: number, event: 'start') => {
  await axios.post(
    'https://api2.amplitude.com/2/httpapi',
    {
      api_key: process.env.AMPLITUDE_API_KEY || 'not_exist',
      events: [
        {
          event_properties: {
            name: 'olymp_trade',
          },
          device_id: userId,
          event_type: event,
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

bot.command('start', ctx => {
  const USER = ctx.from;
  USER_ID = USER.id;
  const TG_LANG = USER.language_code;

  if (
    TG_LANG === 'en' ||
    TG_LANG === 'es' ||
    TG_LANG === 'ms' ||
    TG_LANG === 'pt-br'
  ) {
    USER_LANG_CODE = TG_LANG;
  }

  ctx.reply(`*Olymp trade Bot* — ${Lang[USER_LANG_CODE].start_message}`, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [Markup.button.webApp(`${Lang[USER_LANG_CODE].firstBtn}`, webAppUrl)],
        [
          {
            text: `${Lang[USER_LANG_CODE].secondBtn}`,
            callback_data: 'btn-2',
          },
        ],
      ],
    },
  });

  createAnalytics(USER_ID, 'start');
});

bot.action('btn-2', ctx => {
  ctx.reply(Lang[USER_LANG_CODE].second_message, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [Markup.button.webApp(Lang[USER_LANG_CODE].firstBtn, webAppUrl)],
      ],
    },
  });
});

bot.launch();
