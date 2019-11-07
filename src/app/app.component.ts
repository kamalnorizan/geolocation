import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.subscribeToTopic('news');

      //recieve token
      if (this.platform.is('android') ) {
        this.fcm.getToken().then(
          token => {
            console.log(token);
            alert(token);
          }
        );
      } else if (this.platform.is('ios')) {
        this.fcm.getAPNSToken().then(
          token => {
            console.log(token);
          }
        );
      }
    });

    this.fcm.onNotification().subscribe(
      data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Data Recieved by Push Notification');
          this.router.navigate([data.landing_page, data.status]);
        } else {
          console.log('Data Recieved by Push Notification');
          this.router.navigate([data.landing_page, data.status]);
        }
      }
    );
  }
}
