declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.svg";

type textObjectType = {
  id: string;
  text: string;
  type: "TEXT";
};

type viewsType =
  | "text"
  | "translate"
  | "launch"
  | "settings"
  | "images"
  | "currency"
  | "dates"
  | "tone-of-voice"
  | "text-edits"
  | "text-compose";

type modelSettingsType = {
  model: string;
  prompt: string;
  temperature: number;
  stopSequences: string[];
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maximumTokens: number;
  n: number;
  variantToUse: number;
};
