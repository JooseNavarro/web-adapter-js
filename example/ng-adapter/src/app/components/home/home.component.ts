import { Component, OnInit } from '@angular/core';
import { RoutesAdapter, RoutesInterface, WebComponent, StoreAdapter } from '../../../../../../dist/';
// import { RoutesAdapter, RoutesInterface, WebComponent, StoreAdapter } from '../../../../../../lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private webComponent = new WebComponent();
  private store =  StoreAdapter.root;

  constructor(private router: Router) { }

  public listenerRouter(): void {
    const routerAdapter = new RoutesAdapter();
    routerAdapter.on().subscribe( ( { route }: RoutesInterface) => {
      this.router.navigateByUrl(route).then();
    });
  }

  esx() {
    console.log(1)
    this.store.dispatch({ name: 'father' });
  }

  ngOnInit(): void {
    this.listenerRouter();

    this.store.on().subscribe( a => console.log('dad: ', a) );
    this.webComponent.createWorkSpace('location');
    this.webComponent.render('micro-profile');
  }

}
