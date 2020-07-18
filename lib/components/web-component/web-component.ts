import { CONTAINER_WA } from "../../constants";

export class WebComponent {

    private containerElement = '';

    get getContainerElement(): HTMLElement | any {
        return document.getElementById(this.containerElement);
    }

    public render( selector: string ): void {
        const el: HTMLElement = document.createElement(selector);
        el.setAttribute('id', `parent${selector}`);
        this.getContainerElement.appendChild(el);
    }

    public fragmentRender( selector: string ): void {
        const fragment = new DocumentFragment();
        const el: HTMLElement = document.createElement(selector);
        el.setAttribute('id', `parent${selector}`);
        fragment.appendChild(el);
        this.getContainerElement.appendChild(fragment);
    }

    public input(selector: string, props: Array<{ name: string, value: any }>): void {
        const elements: HTMLCollectionOf<Element> = document.getElementsByTagName(selector);
        const components = Object.values(elements);
        components.forEach( (el) =>  props.
        forEach( ({ name, value }) => el.setAttribute(name, value)))
    }

    public createWorkSpace(id: string = CONTAINER_WA ) {
        this.containerElement = id;
        const dc = document;
        const container = dc.createElement('div');
        container.setAttribute('id', id);
        dc.body.appendChild(container);
    }

}
