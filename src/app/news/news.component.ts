import {Component, OnInit} from '@angular/core';
import {ListSettings} from "../factory/list/get-factory-list.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  listSettings: ListSettings = ListSettings.NearestFuture;
  constructor() {
  }

  ngOnInit(): void {
  }

  slides = [
    {'image': 'assets/Images/Slides/slide6.jpg'},
    {'image': 'assets/Images/Slides/slide7.jpg'},
    {'image': 'assets/Images/Slides/slide8.jpg'},
    {'image': 'assets/Images/Slides/slide9.jpg'},
    {'image': 'assets/Images/Slides/slide10.jpg'}
  ];

}
