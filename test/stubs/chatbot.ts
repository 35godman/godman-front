import { Chatbot } from '@/types/models/globals';
import chatbotSettingsStub from './settings';
import { sourcesStub } from './sources';
import { userStub } from './user';

export const chatbotStub = (): Chatbot => {
  return {
    _id: '64cd0ca018e6d0abf364f219',
    owner: userStub(),
    chatbot_name: 'SUPROTEC NEW',
    embed_code: {
      iframe:
        '<iframe \n      src="https://godman.tech/chatbot-iframe/64cd0ca018e6d0abf364f209"\n      width="100%"\n      style="height: 100%; min-height: 700px"\n       id="godman-chatbot"\n    ></iframe>\n  ',
      script:
        '<script src="https://godman.tech/static/scripts/embed-script.js" defer></script>',
    },
    share_link: '',
    conversations: [],
    settings: chatbotSettingsStub(),
    sources: sourcesStub(),
  };
};
