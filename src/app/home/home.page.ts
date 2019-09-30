import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuCtrl: MenuController,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  iniciarCompra() {
    this.navCtrl.navigateForward('/home/compras/clientes');
  }
}
