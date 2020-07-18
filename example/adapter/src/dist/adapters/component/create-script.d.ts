import { CreateElement, ElementDescription, StatusElement } from '../../interfaces';
export declare class CreateScript implements CreateElement {
    build({ name, src, type }: ElementDescription): Promise<StatusElement>;
    appendChild(element: HTMLScriptElement): void;
}
