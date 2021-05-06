import { ElementDescription, StatusElement } from "./global-element";

export interface AppendChild {
   appendChild(el: HTMLScriptElement | HTMLStyleElement): boolean;
}

export interface CreateElement extends AppendChild {
   build( element: ElementDescription ):  Promise<StatusElement>;
}
