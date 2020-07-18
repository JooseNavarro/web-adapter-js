import { BasicElement, ElementDescription, StatusElement } from "../../interfaces";
import { Observable } from "rxjs";
export declare class ComponentAdapter {
    allComponent: Array<BasicElement>;
    private statusComponent;
    getStatusComponent(): Observable<StatusElement>;
    loadComponents(microComponent?: Array<ElementDescription>): void;
    allRemoveComponent(): void;
    removeOneComponent(name: string): void;
    createScript(element: ElementDescription): void;
}
