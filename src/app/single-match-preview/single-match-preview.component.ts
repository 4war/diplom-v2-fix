import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-single-match-preview',
  templateUrl: './single-match-preview.component.html',
  styleUrls: ['./single-match-preview.component.css']
})
export class SingleMatchPreviewComponent implements OnInit {

  constructor() { }

  testMatch: any = [{
    teams: [
      { name: 'Team  A', score: 1 },
      { name: 'Team  B', score: 2 }]
  },];

  @Input() match: any;

  ngOnInit(): void {
  }



}
