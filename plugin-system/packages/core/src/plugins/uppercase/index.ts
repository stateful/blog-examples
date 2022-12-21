import {TextPlugin} from '@text-plugins/types';

class UpperCasePlugin extends TextPlugin {
  
    transformText(text: string): string {
        return text.toUpperCase();
    }
}

export default UpperCasePlugin;