import { Observable } from "rxjs";
import { BasicElement, ElementDescription, StatusElement } from "../../interfaces";
export declare class UiAdapter {
    allStyles: Array<BasicElement>;
    private statusStyles;
    getStatusStyles(): Observable<StatusElement>;
    create(name: string, src: string): void;
    createLink(name: string, src: string): void;
    loadCdn(styles?: Array<ElementDescription>): void;
    loadStyles(styles?: Array<ElementDescription>): void;
    removeOneStyle(name: string): void;
    allRemoveStyles(): void;
}
