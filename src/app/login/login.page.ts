import { MenuController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  erro = {
    cpf: false,
    senha: false
  }
  

  constructor(private menuCtrl: MenuController, private authService: AuthService, private alertCtrl: AlertController, private loadginCtrl: LoadingController, private navController: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(false)
  }

  public async login(){

    if(!this.authGroup.valid){
        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'Preencha todos os campos',
          buttons: ['OK']
        });
        await alert.present();
      }else{
        let auth = {
          username: this.authGroup.value.username,
          password: this.authGroup.value.password
        };

        const loading = await this.loadginCtrl.create();
        loading.present();
        this.authService.login(auth).subscribe(async (data) => {
          loading.dismiss();
          if(data.type !== 'agente'){
            const alert = await this.alertCtrl.create({
              header: 'Erro',
              message: 'Insira as credenciais de um agente',
              buttons: ['OK']
            });
            await alert.present();
          }else{
          this.navController.navigateRoot('/home');
        }
        }, async (err) => {
          loading.dismiss();
          if(err.status === 401){
            if(err.error.message === 'Username incorreto'){
              this.erro.cpf = true;
            }else{
              this.erro.senha = true;
            }
        }else{
          const alert = await this.alertCtrl.create({
            header: 'Erro',
            message: 'Ocorreu um erro',
            buttons: ['OK']
          });
          await alert.present();
        }
        })
      }
  }

  public removerErro(){
    if (this.erro.cpf){
      this.erro.cpf = false;
    }
    if (this.erro.senha){
      this.erro.senha = false;
    }
  }

}
