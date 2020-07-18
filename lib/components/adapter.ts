import {ELEMENT_ID_CONTAINER} from "../constants";
import {AngularConfig, Framework} from "../enum";
import {ComponentAdapter} from "./component/component.adapter";

export class Adapter {

  constructor() {
    this.buildElementAdapter();
  }

  private buildElementAdapter(): void {

    const { createElement, body } = document;
    const el = createElement('div');
    el.id = ELEMENT_ID_CONTAINER;
    body.appendChild(el);
  }

  public init( frameworks: Array<string> = [] ): void {
    frameworks.forEach( (data: string) => {
      if (data === Framework.angular) this.initialAngular('initAngular');
    });
  }


  private initialAngular( name: string ): void {

    const scriptElement = new ComponentAdapter();
    scriptElement.loadComponents([
      { name: 'zonaJs', src: AngularConfig.zone },
      { name: 'customElement', src: AngularConfig.customElement },
    ]);
  }

}
