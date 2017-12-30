import { Component, OnInit } from '@angular/core';
import { AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  srcPoint;
  dstPoint;
  icebergList;
  newIceberg;
  route;

  constructor(private appService: AppService) { }

  ngOnInit(){
    this.srcPoint = [];
    this.dstPoint = [];
    this.icebergList = [[[1,1],[3,1],[3,3],[1,3]]];
    this.newIceberg = [];
    this.route = null;
  }

  isValidPoint(elem){
    return Array.isArray(elem) && elem.length==2 && !elem.some(isNaN);
  }

  addPoint(){
    this.newIceberg.push([]);
  }

  removePoint(i){
    this.newIceberg.splice(i,1);
  }

  addIceberg(){
    this.icebergList.push(this.newIceberg);
    this.newIceberg = []
  }

  removeIceberg(i){
    this.icebergList.splice(i,1);
  }

  calculateRoute(){
    this.appService
        .calculateRoute(this.srcPoint,this.dstPoint,this.icebergList)
        .subscribe(r => {
          if (r == null){
            this.route = r;
            alert("No route fround");
          }
       })
  }
}