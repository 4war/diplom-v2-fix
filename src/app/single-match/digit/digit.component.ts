import {
  AfterContentChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Digit} from "../../shared/Score";
import {MatchService} from "../../services/match.service";
import {Match} from "../../shared/Match";

@Component({
  selector: 'app-digit',
  templateUrl: './digit.component.html',
  styleUrls: ['./digit.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class DigitComponent implements OnInit {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code.length == 0)
      return;

    let lastDigit = event.code[event.code.length - 1];
    let numberDigit = parseInt(lastDigit);

    if (this.isEdited && numberDigit >= 0 && this.digit) {
      this.digit!.value = numberDigit;
      this.onChange.emit();
    }
  }

  @Input() digit?: Digit;
  @Input() match?: Match;
  @Input() playerNumber!: number;
  @Output() onChange = new EventEmitter();

  isEdited = false;
  color = '#66bbff';

  constructor(private matchService: MatchService,) {
  }

  ngOnInit(): void {
  }

  update(): void {
    this.color = this.isEdited ? '#66bbff' : 'white';
  }

  focusIn(): void {
    if (!this.matchService.editMode) return;
    this.isEdited = true;
    this.update();
  }

  focusOut(): void {
    if (!this.matchService.editMode) return;
    this.isEdited = false;
    this.update();
  }
}
