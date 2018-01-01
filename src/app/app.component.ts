import { Component, OnInit } from '@angular/core';
import { AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  srcPoint; //the source point of the path to find
  dstPoint; // the destination point of the path to find
  icebergList; //List of icebergs
  newIceberg; //A temp iceberg to add to the list
  route; //The route from src to dst

  constructor(private appService: AppService) { }

  ngOnInit(){
    this.clearData();
  }

  demoData(){
    return {
      srcPoint: [2,2],
      dstPoint: [12,12],
      icebergList: [[[3,3],[4,1],[4,4],[1,4]],
                    [[6,6],[8,4],[9,9]]]
    };
  }

  runDemoData(){
    let data = this.demoData();
    this.srcPoint = data.srcPoint;
    this.dstPoint = data.dstPoint;
    this.icebergList = data.icebergList;
    this.calculateRoute();
  }

  clearData(){
    this.srcPoint = [];
    this.dstPoint = [];
    this.icebergList = [];
    this.newIceberg = [];
    this.route = null;
  }

  // Add a new empty point to the new iceberg
  addPoint(){
    this.newIceberg.push([]);
  }

  //Remove a point fron the new iceberg
  removePoint(i){
    this.newIceberg.splice(i,1);
  }

  //Add a new iceberg to the list
  addIceberg(){
    this.icebergList.push(this.newIceberg);
    this.newIceberg = []
  }

  //Remove an iceberg from the list
  removeIceberg(i){
    this.icebergList.splice(i,1);
  }

  coordinateToDisplay(coordinate){
    return coordinate * 1;
  }

  pointToDisplay(point){
    return point.map(coordinate => this.coordinateToDisplay(coordinate));
  }

  icebergToDisplay(iceberg){
    return iceberg.map(point=> this.pointToDisplay(point)).join(" ");
  }

  routePointToDisplay(point){
    return [this.coordinateToDisplay(point.x),
            this.coordinateToDisplay(point.y)];
  }

  formatRoute(route){
    return route.map(xy=> 
      this.routePointToDisplay(xy))
  }

  routeToDisplay(route){
    return this.formatRoute(route).join(" ");
  }

  routeToString(route){
    return JSON.stringify(route);
  }

  routeHeight(route){
    return this.formatRoute(route).reduce((a,b)=> 
      Math.max(a, b[1]),100);
  }

  routeWidth(route){
    return this.formatRoute(route).reduce((a,b)=> 
      Math.max(a, b[0]),100);
  }

  validParams(){
    return this.srcPoint.length === 2 &&
           this.dstPoint.length === 2;
  }

  //Send a request to the servcie to calcualte the route from src to dst
  calculateRoute(){
    if (!this.validParams()){
      alert("not all fields are filled");
      return;
    }
    this.appService
        .calculateRoute(this.srcPoint,this.dstPoint,this.icebergList)
        .subscribe(r => {
          if (r.status!=200){
            alert(r.statusText);
            return;
          }
          this.route = r.json();
          if (this.route === null){
            alert("No route fround");
          }
          else {
            this.route.unshift({x:this.srcPoint[0],y:this.srcPoint[1]});
          }
       })
  }
}