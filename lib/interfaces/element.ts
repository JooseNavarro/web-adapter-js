import { StatusElement } from "./global-element";

export interface AppendChild {
   appendChild(el: HTMLScriptElement | HTMLStyleElement): void;
}

export interface CreateElement extends AppendChild {
   build( src: string, name: string, options?: HTMLScriptElement | HTMLStyleElement ):  Promise<StatusElement>;
}
