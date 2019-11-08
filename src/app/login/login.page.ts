import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.authService.getToken().then(
      () => {
        if (this.authService.isLoggedIn) {
          this.navCtrl.navigateRoot('/home');
        }
      }
    );
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/home');
      }
    );
  }

}
