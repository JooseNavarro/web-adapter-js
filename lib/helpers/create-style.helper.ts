import { LINK_ELEMENT, STYLE_ELEMENT } from "../constants";
import { CreateStyles } from "../components/styles/interface";
import { StatusElement } from "../interfaces/global-element";
import AdapterServices from "../services/adapter.services";
import { atDocument } from "../utils/dom";


export class CreateStyleHelper implements CreateStyles {

    private appendChild(style: HTMLStyleElement | HTMLLinkElement, fn: (e: boolean)=> any): void {
        const dc: Document = atDocument();
        const containerElement = dc.head;
        const documentFragment = dc.createDocumentFragment();
        documentFragment.appendChild(style);
        containerElement.appendChild(documentFragment);
        fn(true);
    }

    public build(name: string, code: string): Promise<StatusElement> {
        const element: HTMLStyleElement = atDocument().createElement( STYLE_ELEMENT );
        element.textContent = code;

        this.appendChild(element, (status: boolean) => {
            console.log(status)
        });
        return new Promise<StatusElement>((resolve, reject) => {
            element.onload = (() => resolve({ name, status: true, element: element } ));
            element.onerror = (() => {
                reject({ name, status: false, element: element } );
                element.remove();
            } );
        });
    }

    public createLink(name: string, href: string, fn: (status: StatusElement)=> any): any {
        const element: HTMLLinkElement = atDocument().createElement( LINK_ELEMENT );
        element.href = href;
        element.type = "text/css";
        element.rel = "stylesheet";

        return this.appendChild(element, (status: boolean) => 
        fn({ name, status, element: element }));
    }

    public async sourceServices(src: string): Promise<any> {
        const adapterServices = new AdapterServices();
        return await adapterServices.textContent(src);
    }
}

