import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import users from '../mocks/index.json';

@Injectable()
export class Store {

  public store(): Observable<{results: Array<any>, info: any}> {
    const source = interval(1000);
    return source.pipe(map( () => users));
  }

  public webComponents(): Array<any> {
    return users.results;
  }
}
