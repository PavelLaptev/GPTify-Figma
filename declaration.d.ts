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

type imageObjectType = {
  id: string;
  uint8Array: Uint8Array;
  type: "IMAGE";
};

type viewsType =
  | "error"
  | "loading"
  | "text"
  | "translate"
  | "launch"
  | "settings"
  | "currency"
  | "dates"
  | "tone-of-voice"
  | "text-edits"
  | "text-compose"
  | "images"
  | "create-images"
  | "edit-image"
  | "profile-picture"
  | "animals"
  | "art"
  | "anime-avatar";

type composeModelSettingsType = {
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

type editsModelSettingsType = {
  model: string;
  input: string;
  instruction: string;
  temperature: number;
  stopSequences: string[];
  topP: number;
};

interface TextEditsViewProps {
  apiKey: string;
  setView: (view: viewsType) => void;
  setErrorMessage: (message: string) => void;
}
