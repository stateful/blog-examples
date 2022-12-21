export abstract class TextPlugin {
  options: any;
  abstract transformText(text: string): string;
}
