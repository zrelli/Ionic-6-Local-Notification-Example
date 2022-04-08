import { NativeApiService } from './../services/native-api.service';
import { Component, OnInit } from '@angular/core';
import { ILocalNotification } from '@awesome-cordova-plugins/local-notifications';
import { LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  localNotificationData: ILocalNotification = {
    title: '',
    text: '',
    foreground: true,
    trigger: { at: new Date() },
    led: 'FF0000',
    sound: null,
  };
  selectedDate: Date = new Date();
  constructor(
    private nativeApi: NativeApiService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}
  ngOnInit() {}
  async scheduleNotification() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000 // we will dismiss it manually
    });
    await loading.present();
    setTimeout(async () => {
      this.localNotificationData.id = this.randomId();
      let data: ILocalNotification = this.localNotificationData;
      this.nativeApi.scheduleNotification(data);
      loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Notification has been created.',
        duration: 2000,
      });
      toast.present();
    }, 2000);
  }
  randomId() {
    return Math.floor(Math.random() * 10000);
  }
  dateChanged(event) {
    let date: string = event.detail.value;
    this.selectedDate = new Date(date);
    this.localNotificationData.trigger.at = this.selectedDate;
  }
}
