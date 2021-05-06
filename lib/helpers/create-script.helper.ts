import { throwError } from "rxjs";
import { ELEMENT_ID_CONTAINER, SCRIPT_ELEMENT } from "../constants";
import { CreateElement } from "../interfaces/element";
import { ElementDescription, StatusElement } from "../interfaces/global-element";
import { atDocument, atWindow } from "../utils/dom";

export class CreateScriptHelper implements CreateElement {

    public build( { name, src, type }: ElementDescription): Promise<StatusElement> {

        const dc: Document = atDocument();
        const elementId = `waj:${name}`;
        const scriptElement: HTMLScriptElement = dc.createElement(SCRIPT_ELEMENT);
        scriptElement.type = type || 'text/javascript';
        scriptElement.src = src;
        scriptElement.async = true;
        scriptElement.id = elementId;
        const script = this.appendChild(scriptElement);

        return new Promise((resolve) => {
            resolve({ name, element: scriptElement, status: script })
        });
    }

    public appendChild(element: HTMLScriptElement): any {
        try {
            const dc: Document = atDocument();
            const containerElement = dc.getElementById(ELEMENT_ID_CONTAINER) || dc.body;
            const documentFragment = dc.createDocumentFragment();
            documentFragment.appendChild(element);
            containerElement.appendChild(documentFragment);
            return true;
        } catch(e) {
            return false;
        }
    }

}

