import { BasicElement, ElementDescription, StatusElement } from "../../interfaces/global-element";

export interface Styles {
    allStyles: Array<BasicElement>;
    loadCdn(styles: Array<ElementDescription>): void;
    loadSource(styles: Array<ElementDescription>): void;
    removeOneStyle(name: string): void;
    allRemoveStyles(): void;
}

export interface CreateStyles {
    build(name: string, code: string): Promise<StatusElement>;
    createLink(name: string, href: string, fn: ()=> any): any;
    sourceServices(src: string): Promise<any>;
}
