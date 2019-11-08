import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    private geolocation: Geolocation,
    private fcm: FCM,
    private platform: Platform,
    private authService: AuthService
  ) { }
  longitud: any;
  latitude: any;
  disabled = 'disabled';
  jarak: any;
  ionViewWillEnter() {
    this.geolocation.getCurrentPosition().then(
      position => {
        this.longitud = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.jarak = this.distance(this.latitude, this.longitud);
        if (this.jarak < 100) {
          console.log(this.jarak);
          this.disabled = 'false';
        }
      }
    );
  }

  ngOnInit(){
    this.fcm.subscribeToTopic('news');

    //recieve token
    if (this.platform.is('ios')) {
      this.fcm.getAPNSToken().then(
        token => {
          console.log(token);
        }
      );
    } else {
      this.fcm.getToken().then(
        token => {
          alert(token);
          this.authService.storefcm(token).subscribe(
            data => {
              alert(data['msg']);
            },
            error => {
              alert(error);
            }
          );
          console.log(token);
          // alert(token);
        }
      );
    }
  }

  toRadius(value) {
    return value * Math.PI / 180;
  }

  distance(lat1, lon1) {
    let lat2 = 4.210643; // dari db
    const lon2 = 101.975766; // dari db
    const R = 6371;
    const distLat = this.toRadius(lat2 - lat1);
    const distLon = this.toRadius(lon2 - lon1);
    lat1 = this.toRadius(lat1);
    lat2 = this.toRadius(lat2);

    const a = Math.sin(distLat / 2) * Math.sin(distLat / 2) + Math.sin(distLon / 2) * Math.sin(distLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    return dist;
  }

}
