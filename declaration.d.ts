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

type textObject = {
  id: string;
  text: string;
  type: "TEXT";
};

type viewsType = "text" | "translate" | "launch" | "settings" | "images";
