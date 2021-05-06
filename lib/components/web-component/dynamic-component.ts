import { CONTAINER_WA } from "../../constants";
import { Attributes, DynamicComponents } from "./interface";
import { WindowAdapter } from "../../utils/window";
import { atDocument } from "../../utils/dom";

export class DynamicComponent implements DynamicComponents {

    private containerElement = '';
    private elements: Array<HTMLElement> = [];
    private globalWindow = new WindowAdapter();

    get getContainerElement(): HTMLElement | any {
        return atDocument().getElementById(this.containerElement);
    }

    public createWorkSpace(id: string = CONTAINER_WA ): void {
        this.containerElement = id;
        const dc = atDocument();
        const container = dc.createElement('div');
        container.setAttribute('id', id);
        dc.body.appendChild(container);
    }

    public props(key: string = '', props: object): void {
        this.globalWindow.setProps(`${key}`, props);
    }

    public render( selector: string, attributes: Attributes ): void {
        const el: HTMLElement = atDocument().createElement(selector);
        el.setAttribute('id', `parent-${selector}-${this.elements.length}`);
        Object.keys(attributes).forEach( (value, index) => el.setAttribute(value, attributes[value]) );
        this.getContainerElement.appendChild(el);
        this.elements.push(el);
        this.globalWindow.setWebComponent(el);
    }

    public fragmentRender( selector: string ): void {
        const fragment = new DocumentFragment();
        const el: HTMLElement = atDocument().createElement(selector);
        el.setAttribute('id', `parent-${selector}`);
        fragment.appendChild(el);
        this.getContainerElement.appendChild(fragment);
    }

    public input(selector: string, props: Array<{ name: string, value: any }>): void {
        const elements: HTMLCollectionOf<Element> = atDocument().getElementsByTagName(selector);
        const components = Object.values(elements);
        components.forEach( (el) =>  props.
        forEach( ({ name, value }) => el.setAttribute(name, value)))
    }

}
