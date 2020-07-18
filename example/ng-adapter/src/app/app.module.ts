import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import {RouterModule} from '@angular/router';
import { Adapter, LoadScripts } from '../../../../lib';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {

  constructor() {
    this.initComponenet();
  }

  private initComponenet(): void {

    const load = new LoadScripts();
    const adapter = new Adapter();

    adapter.init();
    load.import([
      { name: 'svelte', src: 'http://127.0.0.1:3002/build/bundle.js' }
    ]);
  }

}
