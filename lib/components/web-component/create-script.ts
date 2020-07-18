import {CreateElement, ElementDescription, StatusElement} from '../../interfaces';
import {ELEMENT_ID_CONTAINER, SCRIPT_ELEMENT} from "../../constants";
import {isNullOrUndefined} from "../../utils";


export class CreateScript implements CreateElement {

    public build( { name, src, type }: ElementDescription): Promise<StatusElement> {

        const dc: Document = document;
        const elementId = `waj:${name}`;
        const scriptElement: HTMLScriptElement = dc.createElement(SCRIPT_ELEMENT);
        scriptElement.type = type || 'text/javascript';
        scriptElement.src = src;
        scriptElement.async = true;
        scriptElement.id = elementId;
        const currentElement: boolean = isNullOrUndefined(dc.getElementById(elementId));
        if (currentElement) this.appendChild(scriptElement);

        return new Promise((resolve, reject) => {
            scriptElement.onload = ((e) => resolve({ name, element: scriptElement, status: true }));
            scriptElement.onerror = ((e) => {
                reject({ name, element: scriptElement, status: false });
                scriptElement.remove();
            });
        });
    }

    public appendChild(element: HTMLScriptElement): void {

        const dc: Document = document;
        const containerElement = dc.getElementById(ELEMENT_ID_CONTAINER) || dc.body;
        const documentFragment = dc.createDocumentFragment();
        documentFragment.appendChild(element);
        containerElement.appendChild(documentFragment);
    }

}
