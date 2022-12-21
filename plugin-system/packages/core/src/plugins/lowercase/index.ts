import {TextPlugin} from '@text-plugins/types';

class LowerCasePlugin extends TextPlugin {
  
    transformText(text: string): string {
        return text.toLowerCase();
    }
}

export default LowerCasePlugin;