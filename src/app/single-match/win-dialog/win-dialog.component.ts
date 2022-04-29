import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatchService} from "../../services/match.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-win-dialog',
  templateUrl: './win-dialog.component.html',
  styleUrls: ['./win-dialog.component.css']
})
export class WinDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<WinDialogComponent>) { }

  reasons = ['Отказ по болезни', 'Снятие с матча', 'Другое']

  ngOnInit(): void {
  }

  cancel(): void{
    this.dialogRef.close();
  }

  confirm(reason: string): void{
    this.dialogRef.close(reason);
  }
}
