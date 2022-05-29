import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-overview-heatmap',
  templateUrl: './profile-overview-heatmap.component.html',
  styleUrls: ['./profile-overview-heatmap.component.css']
})
export class ProfileOverviewHeatmapComponent implements OnInit {

  size = 1000;
  xCenter = this.size / 2;
  yCenter = this.size / 2;
  ft = 18;

  rectangles: Square[] = [];

  constructor() {
    this.createSquares();
  }

  ngOnInit(): void {
  }

  createSquares(): void {
    Math.random();
    let amount = 100;
    let stepX = this.size / amount;
    let stepY = (55 * this.ft) / amount;
    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        let minXRandom = 0.7 - Math.pow((x - amount / 2) / 30, 2);
        let maxXRandom = 1 - Math.pow((x - amount / 2) / 35, 2);

        let minYRandom = 0.2 - Math.pow((y - amount * 5 / 10) / 50, 2);
        let maxYRandom = 1 - Math.pow((y - amount * 9 / 10) / 35, 2);

        let valueX = Math.random() * (maxXRandom - minXRandom + 1) + minXRandom;
        let valueY = Math.random() * (maxYRandom - minYRandom + 1) + minYRandom;
        let value = (valueX + valueY)/2;
        value = value < 0 ? 0 : value;

        let square = {X: x * stepX, Y: y * stepY, Width: stepX, Height: stepY, Value: value};
        this.rectangles.push(square);
      }
    }
  }

  getColor(value: number): string {
    let color1 = [255, 160, 0];
    let color2 = [255, 0, 0];

    let w1 = value;
    let w2 = 1 - w1;
    let rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)];
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
}

class Square {
  X!: number;
  Y!: number;
  Width!: number;
  Height!: number;
  Value!: number; //от 0 до 1
}
