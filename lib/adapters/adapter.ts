import { AngularConfig, Framework } from "../enum";
import { ComponentAdapter } from "./component/component.adapter";

export class Adapter {

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
