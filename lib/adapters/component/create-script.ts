import { StatusElement } from '../../interfaces';
import { CreateElement } from "../../interfaces";
import { SCRIPT_ELEMENT } from "../../constants";

export class CreateScript implements CreateElement {

  public build( name: string, src: string, options?: HTMLScriptElement): Promise<StatusElement> {
      const element = document.createElement(SCRIPT_ELEMENT);
      element.type = 'text/javascript';
      element.src = src;
      element.async = true;
      this.appendChild(element);
      return new Promise((resolve, reject) => {
        element.onload = ((e) => resolve({ name, element, status: true  } ));
        element.onerror = ((e) => {
          reject({ name, element, status: false } );
          element.remove();
        } );
      });
  }

  public appendChild(element: HTMLScriptElement): void {
    const documentHead = document.head || document.getElementsByTagName('head')[0];
    documentHead.appendChild(element);
  }

}
