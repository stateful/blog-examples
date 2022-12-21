import {TextPlugin} from '@text-plugins/types';

class EchoPlugin extends TextPlugin {
  
    transformText(text: string): string {
        return text;
    }
}

export default EchoPlugin;