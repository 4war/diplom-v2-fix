import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {Digit} from "../../shared/Score";
import {MatchService} from "../../services/match.service";

@Component({
  selector: 'app-digit',
  templateUrl: './digit.component.html',
  styleUrls: ['./digit.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class DigitComponent implements OnInit, AfterViewInit {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code.length == 0)
      return;

    let lastDigit = event.code[event.code.length - 1];
    let numberDigit = parseInt(lastDigit);

    if (this.isEdited && numberDigit && this.digit)
      this.digit!.value = numberDigit;
  }

  @Input() digit?: Digit;
  isEdited = false;
  color = '#66bbff';

  constructor(private matchService: MatchService) {
  }

  ngOnInit(): void {
    this.color = this.digit?.finished
      ? this.digit?.win ? '#ADFF2F' : '#E44749'
      : 'white';
  }

  ngAfterViewInit() {
  }

  update(): void{
    this.color = this.isEdited ? '#66bbff' : 'white';
  }

  focusIn(): void{
    if (!this.matchService.editMode) return;
    this.isEdited = true;
    this.update();
  }

  focusOut(): void{
    if (!this.matchService.editMode) return;
    this.isEdited = false;
    this.update();
  }
}
