import { ElementDescription, StatusElement } from "./global-element";
export interface AppendChild {
    appendChild(el: HTMLScriptElement | HTMLStyleElement): void;
}
export interface CreateElement extends AppendChild {
    build(element: ElementDescription): Promise<StatusElement>;
}
