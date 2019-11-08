import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.fcm.subscribeToTopic('news');

      // //recieve token
      // if (this.platform.is('ios')) {
      //   this.fcm.getAPNSToken().then(
      //     token => {
      //       console.log(token);
      //     }
      //   );
      // } else {
      //   this.fcm.getToken().then(
      //     token => {
      //       this.authService.storefcm(token).subscribe(
      //         data => {
      //           alert('done');
      //         },
      //         error => {
      //           console.log(error);
      //         }
      //       );
      //       console.log(token);
      //       // alert(token);
      //     }
      //   );
      // }
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
