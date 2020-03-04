import { AdapterServices } from "../../services/adapter.services";
import { StatusElement } from "../../";
import { AxiosResponse } from "axios";
import { LINK_ELEMENT, STYLE_ELEMENT} from "../../constants";

export class CreateStyle {

    public build(name: string, code: string): Promise<StatusElement> {
        const element: HTMLStyleElement = document.createElement( STYLE_ELEMENT );
        element.textContent = code;

        this.appendChild(element);
        return new Promise<StatusElement>((resolve, reject) => {
            element.onload = (() => resolve({ name, status: true, element: element } ));
            element.onerror = (() => {
                reject({ name, status: false, element: element } );
                element.remove();
            } );
        });
    }

    public createLink(name: string, href: string): Promise<StatusElement> {
        const element: HTMLLinkElement = document.createElement( LINK_ELEMENT );
        element.href = href;
        element.type = "text/css";
        element.rel = "stylesheet";

        this.appendChild(element);
        return new Promise<StatusElement>((resolve, reject) => {
            element.onload = (() => resolve({ name, status: true, element: element } ));
            element.onerror = (() => {
                reject({ name, status: false, element: element } );
                element.remove();
            } );
        });
    }

    private appendChild(style: HTMLStyleElement | HTMLLinkElement): void {
        const documentHead = document.head;
        documentHead.appendChild(style);
    }

    public async sourceServices(src: string): Promise<AxiosResponse> {
        const adapterServices = new AdapterServices();
        return await adapterServices.textContent(src);
    }


}
