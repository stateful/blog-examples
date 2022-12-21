import colors from 'colors';
import { TextPlugin } from '@text-plugins/types';

class ColorsPlugin extends TextPlugin {
    transformText(text: string): string {
        return colors.rainbow(text);
    }
}

export default ColorsPlugin;