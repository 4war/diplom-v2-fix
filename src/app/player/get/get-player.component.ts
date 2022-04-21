import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetPlayerComponent implements OnInit {


  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

}
