import PluginManager from '@text-plugins/plugin-manager';
import { TextPlugin } from '@text-plugins/types';
import inquirer from 'inquirer';

export interface ITextSelectedChoice {
  text: string;
  pluginName: string;
}

class TextCLI {
  private pluginManager: PluginManager;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
    // Register the default behavior plugin
    this.pluginManager.registerPlugin({
      name: 'echo-plugin',
      packageName: './echoPlugin',
      isRelative: true
    }); 
  }

  displayPrompt(): void {
    const pluginChoices: string[] = [];
    this.pluginManager.listPluginList().forEach((plugin) => {
      pluginChoices.push(plugin.name);
    });

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'text',
          message: 'What text do you want to transform?',
        },
        {
          type: 'list',
          name: 'pluginName',
          message: 'What plugin do you want to execute?',
          choices: pluginChoices,
        },
      ])
      .then((answer: ITextSelectedChoice) => {
        // Execute the plugin
        const textPlugin = this.pluginManager.loadPlugin<TextPlugin>(answer.pluginName);
        console.log(`This is the transformed result for ${answer.text}: ${textPlugin.transformText(answer.text)}`);
      });
  }
}

export default TextCLI;
