import { ELEMENT_ID_CONTAINER } from "../constants";
import { AngularConfig } from "../enum";
import {LoadScripts} from "./web-component/load-script";

export class Adapter {

  constructor() {
    this.buildWorkSpace();
  }

  get config(): any {
    return {
      angular: this.initialAngular(),
      react: () => { }
    };
  }

  private buildWorkSpace(): void {

    const dc: Document = document;
    const el = dc.createElement('div');
    el.id = ELEMENT_ID_CONTAINER;
    dc.body.appendChild(el);
  }

  public init( frameworks: Array<string> = [] ): void {
    frameworks.forEach( (name: string) => this.config[name]);
  }

  private initialAngular( ): void {

    const scriptElement = new LoadScripts();
    scriptElement.import([
      { name: 'zonaJs', src: AngularConfig.zone },
      { name: 'customElement', src: AngularConfig.customElement },
    ]);
  }

}
