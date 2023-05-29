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

type toneOfVoiceType =
  | "simpler"
  | "playful"
  | "romantic"
  | "funny"
  | "formal"
  | "calm"
  | "optimistic"
  | "curious";

type composeModelSettingsType = {
  model: ComposeModelsType;
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

type ComposeModelsType =
  | "text-davinci-003"
  | "text-curie-001"
  | "text-babbage-001"
  | "text-ada-001";

interface TextEditsViewProps {
  apiKey: string;
  setView: (view: viewsType) => void;
  setErrorMessage: (message: string) => void;
}
