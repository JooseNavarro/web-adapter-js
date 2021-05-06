import { ELEMENT_ID_CONTAINER } from "../constants";
import { AngularConfig } from "../enum";
import { LoadScripts } from "./web-component/load-script";
import { atWindow, atDocument } from "../utils/dom";

export class Adapter {

  constructor() {
    this.buildWorkSpace();
    this.buildWindow();
  }

  private config(): any {
    return {
      angular: this.initialAngular(),
      react: () => { }
    };
  }

  private buildWorkSpace(): void {

    const dc: Document = atDocument();
    if (!dc.getElementById(ELEMENT_ID_CONTAINER)) {
      const el = dc.createElement('div');
      el.id = ELEMENT_ID_CONTAINER;
      dc.body.appendChild(el);
    }
  }

  private buildWindow(): void {
    if(!atWindow()['webAdapter']) {
      atWindow()['webAdapter'] = { webComponents: [], props: { }};
    }
  }

  public init( frameworks: Array<string> = [] ): void {
    frameworks.forEach( (name: string) => this.config()[name]);
  }

  private initialAngular( ): void {

    const scriptElement = new LoadScripts();
    scriptElement.import([
      { name: 'zonaJs', src: AngularConfig.zone },
      { name: 'customElement', src: AngularConfig.customElement },
    ]);
  }

}
