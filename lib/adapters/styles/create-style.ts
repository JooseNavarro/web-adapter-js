import { AdapterServices } from "../../services/adapter.services";
import { StatusElement } from "../../index";
import {AxiosResponse} from "axios";

export class CreateStyle {

    public build(name: string, code: string): Promise<StatusElement> {
        const element = document.createElement('style');
        element.textContent = ` :host { ${ code } }`;
        this.appendChild(element);

        return new Promise<StatusElement>((resolve, reject) => {
            element.onload = ((e) => resolve({ name, status: true, element: element } ));
            element.onerror = ((e) => {
                reject({ name, status: false, element: element } );
                element.remove();
            } );
        });
    }

    public appendChild(style: HTMLStyleElement): void {
        const documentHead = document.body;
        documentHead.appendChild(style);
    }

    public async sourceServices(src: string): Promise<AxiosResponse> {
        const adapterServices = new AdapterServices();
        return await adapterServices.textContent(src);
    }
}
