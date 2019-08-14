import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {}

  goHome(){
    this.navCtrl.navigateRoot('/home');
  }

}
