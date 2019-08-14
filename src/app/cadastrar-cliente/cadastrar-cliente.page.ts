import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.page.html',
  styleUrls: ['./cadastrar-cliente.page.scss'],
})
export class CadastrarClientePage implements OnInit {

  clienteGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    data_nascimento: new FormControl('', Validators.required)
  });
  responsavel: any = {};

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.responsavel = JSON.parse(localStorage.getItem('responsavel'));
    
  }

  cadastrarResp(){
    this.navCtrl.navigateForward('/cadastrar-responsavel');
  }

  cadastrarCliente() {
    console.log(this.clienteGroup.value.data_nascimento);
    console.log(this.responsavel);
  }

}
