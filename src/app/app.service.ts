import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService{
  
  constructor(private http : Http){}

  calculateRoute(src,dst,polygons) : Observable<Response>{
    // this won't actually work because the StarWars API doesn't 
    // is read-only. But it would look like this:
    return this
      .http
      .post('/calcRoute', JSON.stringify({src:src,
                                          dst:dst,
                                          polygons:polygons}));
  }
}