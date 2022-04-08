import { Injectable } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications,
} from '@awesome-cordova-plugins/local-notifications/ngx';
@Injectable({
  providedIn: 'root',
})
export class NativeApiService {
  constructor(private localNotifications: LocalNotifications) {}
  scheduleNotification(data: ILocalNotification) {
    this.localNotifications.schedule(data);
  }
}
