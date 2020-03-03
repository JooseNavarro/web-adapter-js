# Web Adapter
Web Adapter es un paquete que te permite tener una comunicación dinámica con tus Web Componets externos, además podrás cargar tus estilos de forma dinámica.

  - Facil de utilizar.
  - Carga async de tus componentes.
  - Puedes Listar y eliminar tus web component.


### Instalación

```sh
$ cd myApp
$ npm install web-adapter-js
```
# 
En tu modulo principal agrega esta configuración.
```
import { Adapter } from 'web-adapter-js';

export class AppModule {
    constructor() {
        const adapter = new Adapter();
        adapter.init(['angular']);
    }
}

```
### Agregar un Web Component
```
import { ComponentAdapter,  UiAdapter } from 'web-adapter-js';

@Component({
  selector: 'app-component',
  template: `<my-component></my-component>`,
})
export class AppComponent implements OnInit {

  public componentAdapter = new ComponentAdapter();
  public uiAdapter = new UiAdapter();

  constructor() { }

  ngOnInit() {
      this.uiAdapter.loadStyles([{name: 'my-style', src: 'https://cdn.com/my-style.css'}]);
      this.microAdapter.loadComponents([{name: 'my-component', src: 'http://localhost:8000/main.js'}]);
  }

}

```


License
----

MIT

----

`Jose Navarro - Trabajo con <3`
