import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Notification} from "../../shared/Notification";
import Enumerable from "linq";
import from = Enumerable.from;
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-user-notifications',
  templateUrl: './profile-user-notifications.component.html',
  styleUrls: ['./profile-user-notifications.component.scss']
})
export class ProfileUserNotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(public profileService: ProfileService, private router: Router) {
    this.notifications = from(profileService.notifications).where(x => !x.read).toArray();
  }

  ngOnInit(): void {
  }

  removeNotification(notification: Notification) {
    notification.read = true;
  }

  redirectToTest(): void {
    this.router.navigateByUrl('profile/test');
  }

}
