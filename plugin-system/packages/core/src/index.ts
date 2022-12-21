import TextCLI from './textCLI';
import PluginManager from '@text-plugins/plugin-manager';


const manager = new PluginManager(__dirname);

// Co-located plugins
manager.registerPlugin({
  name: 'uppercase-plugin',
  packageName: './plugins/upperCase',
  isRelative: true,
});

manager.registerPlugin({
  name: 'lowercase-plugin',
  packageName: './plugins/lowerCase',
  isRelative: true,
});

manager.registerPlugin({
  name: 'passwordify-plugin',
  packageName: './plugins/passwordify',
  isRelative: true,
  options: {
    symbol: '*',
  },
});


// Package plugins
manager.registerPlugin({
  name: 'colors-plugin',
  packageName: '@text-plugins/colors',
});

new TextCLI(manager).displayPrompt();
