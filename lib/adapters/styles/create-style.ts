import { AdapterServices } from "../../services/adapter.services";
import { StatusElement } from "../../";
import { AxiosResponse } from "axios";

export class CreateStyle {

    public build(name: string, code: string): Promise<StatusElement> {
        const element = document.createElement(STYLE_ELEMENT);
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

    public appendChild(style: HTMLStyleElement): void {
        const documentHead = document.head;
        documentHead.appendChild(style);
    }

    public async sourceServices(src: string): Promise<AxiosResponse> {
        const adapterServices = new AdapterServices();
        return await adapterServices.textContent(src);
    }
}
