import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private geolocation: Geolocation
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
  test() {
    alert('done');
  }
}
