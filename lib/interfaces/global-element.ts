export interface StatusElement {
  name: string;
  status: boolean;
  element: any;
}

export interface ElementDescription {
  name: string;
  src: string;
  type?: string;
  registre?: Array<string>
}

export interface BasicElement {
  name: string;
  element: HTMLScriptElement;
}
