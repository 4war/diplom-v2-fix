import {Component, OnInit} from '@angular/core';
import {Moral, Question, Style, Test, Variant} from "./Test";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {Gender} from "../../shared/Tournament";
import {Player} from "../../shared/Player";
import {AuthService} from "../../services/auth.service";
import {ProfileService} from "../../services/profile.service";
import {TestService} from "../../services/test.service";
import Enumerable from "linq";
import from = Enumerable.from;
import {Account} from "../../shared/Account";

@Component({
  selector: 'app-profile-user-test',
  templateUrl: './profile-user-test.component.html',
  styleUrls: ['./profile-user-test.component.scss']
})
export class ProfileUserTestComponent implements OnInit {
  Moral: typeof Moral = Moral;
  Style: typeof Style = Style;
  account?: Account;
  test = new Test();
  message: string = '';
  fakeControl: FormControl = new FormControl([''], Validators.required);
  player?: Player;
  gender: Gender = Gender.Female;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private testService: TestService) {
    this.authService.getCurrentAccount().subscribe(a => {
      this.account = a;
      this.player = this.account?.player;
      this.gender = this.player?.gender == 0 ? Gender.Male : Gender.Female;
      this.test.setTestQuestions(this.gender);
    });
  }

  ngOnInit(): void {
  }

  confirm(): void {
    if (this.player){
      let testResult = this.test.getResult(this.player);
      this.testService.post(this.player.rni, testResult).subscribe();
    }
  }

  allQuestionsAnswered(): boolean{
    return from(this.test.questions)
      .where(q => q.type == 'single')
      .all(q => from(q.variants).any(v => v.checked));
  }

  change(question: Question, event: MatRadioChange): void {
    for (let variant of question.variants) {
      variant.checked = event.value == variant;
    }
  }
}
