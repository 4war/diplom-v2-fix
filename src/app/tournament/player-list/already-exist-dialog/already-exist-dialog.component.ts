import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Match} from "../../../shared/Match";
import {Player} from "../../../shared/Player";

@Component({
  selector: 'app-already-exist-dialog',
  templateUrl: './already-exist-dialog.component.html',
  styleUrls: ['./already-exist-dialog.component.css']
})
export class AlreadyExistDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public player: Player) { }

  ngOnInit(): void {
  }



}
