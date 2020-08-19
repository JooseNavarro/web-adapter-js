![Trailer](https://raw.githubusercontent.com/JooseNavarro/web-adapter-js/master/web-adapter.png)

Web Adapter es un paquete que te permite tener una comunicación dinámica con tus Web Componets externos, además podrás cargar tus estilos de forma dinámica.

  - Facil de utilizar.
  - Carga tus componentes.
  - Puedes Listar y eliminar tus web component.
  - Custom event

### [Documentación](https://joosenavarro.gitbook.io/adapterjs/)

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

### Custom Event
```
import { EventHandler } from 'web-adapter-js';

const event = EventHandler.custom('[MY_CUSTOM_EVENT]');

// Dispatch
event.dispatch({ example: { ...payload } }, '[KEY]')

// Listen
const event =  EventHandler.custom('[MY_CUSTOM_EVENT]');
event.onChanges((payload)=> console.log(payload), '[KEY]');

```


### Micro Frontend
Aplicación de ejemplo [Netflapp](https://github.com/JooseNavarro/netflapp)


License
----

MIT

----

`Jose Navarro - Trabajo con <3`
