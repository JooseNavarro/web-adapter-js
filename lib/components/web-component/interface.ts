import { Observable } from "rxjs";
import { BasicElement, ElementDescription, StatusElement } from "../../interfaces/global-element";

export interface LoadScript {
    allScripts: Array<BasicElement>;
    getStatusStatusScripts(): Observable<StatusElement>;
    import(microComponent: Array<ElementDescription>): void;
    deleteAllScript(): void;
    removeOneScript(name: string): void;
}

export interface WebComponents {
    getContainerElement(): HTMLElement | any;
    render( selector: string, props: Props): void;
    fragmentRender( selector: string ): void;
    input(selector: string, props: Array<{ name: string, value: any }>): void;
    createWorkSpace(id: string): void
}

export interface Props {
    [ key: string ]: any
}
