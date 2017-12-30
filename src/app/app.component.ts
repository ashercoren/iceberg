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
  demoData;

  constructor(private appService: AppService) { }

  ngOnInit(){
    this.clearData();
    this.demoData = {
      srcPoint: [2,2],
      dstPoint: [12,12],
      icebergList: [[[1,1],[3,1],[3,3],[1,3]],
                    [[4,4],[8,4],[6,6]]]
    };
  }

  runDemoData(){
    this.srcPoint = this.demoData.srcPoint;
    this.dstPoint = this.demoData.dstPoint;
    this.icebergList = this.demoData.icebergList;
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
    return coordinate * 10;
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

  routeToDisplay(route){
    return route.map(xy=> 
      this.routePointToDisplay(xy))
      .join(" ");
  }

  routeToString(route){
    return JSON.stringify(route);
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
    this.route = JSON.parse('[{"x":0,"y":1},{"x":0,"y":2},{"x":1,"y":3},{"x":2,"y":4},{"x":3,"y":5},{"x":4,"y":5},{"x":5,"y":6},{"x":6,"y":7},{"x":7,"y":8},{"x":8,"y":9},{"x":9,"y":10},{"x":10,"y":10}]')
    return;
    // this.appService
    //     .calculateRoute(this.srcPoint,this.dstPoint,this.icebergList)
    //     .subscribe(r => {
    //       if (r.status!=200){
    //         alert(r.statusText);
    //         return;
    //       }
    //       this.route = r.json();
    //       if (this.route === null){
    //         alert("No route fround");
    //       }
    //    })
  }
}