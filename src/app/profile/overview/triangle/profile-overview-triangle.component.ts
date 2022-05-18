import {Component, OnInit} from '@angular/core';
import Enumerable from "linq";
import from = Enumerable.from;


@Component({
  selector: 'app-profile-overviewtriangle',
  templateUrl: './profile-overview-triangle.component.html',
  styleUrls: ['./profile-overview-triangle.component.scss']
})
export class ProfileOverviewTriangleComponent implements OnInit {
  center: Coordinates = {X: 600, Y: 600};
  lineLength = 500;
  strokeWidth = 5;
  pointRadius = 7;
  textPadding = 40;

  playStyles = [
    {name: 'Оборонительный', value: 70},
    {name: 'Активный', value: 21},
    {name: 'Реактивный', value: 30},
  ];
  coordinates: Coordinates[] = [];
  polygonPoints:number[] = [];

  constructor() {
    this.defineCoordinates();
  }

  ngOnInit(): void {
  }

  defineCoordinates(){
    let length1 = Math.round(this.playStyles[0].value * this.lineLength / 100);
    let x1 = this.center.X;
    let y1 = this.center.Y - length1;

    let length2 = Math.round(this.playStyles[1].value * this.lineLength / 100);
    let x2 =  Math.round(this.center.X - length2 * 4 / 5);
    let y2 =  Math.round(this.center.Y + length2 * 3 / 5);


    let length3 = Math.round(this.playStyles[2].value * this.lineLength / 100);
    let x3 =  Math.round(this.center.X + length3 * 4 / 5);
    let y3 =  Math.round(this.center.Y + length3 * 3 / 5);

    this.coordinates = [
      {X:x1, Y:y1},
      {X:x2, Y:y2},
      {X:x3, Y:y3},
    ]

    this.polygonPoints = from(this.coordinates).select(a => [a.X, a.Y]).selectMany(a => a).toArray();
  }
}

class Coordinates {
  X!: number;
  Y!: number;
}
