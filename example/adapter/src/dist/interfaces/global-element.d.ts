export interface StatusElement {
    name: string;
    status: boolean;
    element: any;
}
export interface ElementDescription {
    name: string;
    src: string;
    type?: string;
}
export interface BasicElement {
    name: string;
    element: HTMLScriptElement;
}
