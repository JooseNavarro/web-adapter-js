import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../models/store';
import { Routes, StoreAdapter, WebComponent} from '../../../../../../dist/';
import {RoutesInterface} from "../../../../../../dist/components/routes/interface";


@Component({
  selector: 'app-home',
  template: `
    <div id="location" style="display: flex; margin: 50px; justify-content: center;"> </div>
    <pre style="background-color: #1f2123; color: white; border-radius: 20px; padding: 30px;">
      {{ currentUser | json }}
    </pre>
  `
})
export class HomeComponent implements OnInit {

  private webComponent = new WebComponent();
  private store =  StoreAdapter.root;
  public currentUser = {};
  constructor(private router: Router, private currentStore: Store) { }

  private mainRouter(): void {
    const routerAdapter = new Routes();
    routerAdapter.on().subscribe( ( { route }: RoutesInterface) => {
      this.router.navigateByUrl(route).then();
    });
  }

  private globalStore(): void {
    this.store.on().subscribe( ( { stateApp } ) => this.currentUser = stateApp);
  }

  ngOnInit(): void {
    this.webComponent.createWorkSpace('location');
    this.mainRouter();
    this.globalStore();

    this.currentStore.store().subscribe( ( { results } ) =>
      this.store.dispatch(results));

    this.currentStore.webComponents().forEach(( user ) => {
      this.webComponent.render(`micro-profile`, { key: user.id } );
      this.webComponent.props(`micro-profile-${user.id}`, user );
    });
  }

}
