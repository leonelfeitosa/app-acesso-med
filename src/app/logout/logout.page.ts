import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private angularAuth: AngularFireAuth, private navCtrl: NavController) { }

  ngOnInit() {
    localStorage.clear();
    this.angularAuth.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('/login');
    });
  }

}
