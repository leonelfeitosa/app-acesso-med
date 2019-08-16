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
  precisaResponsavel = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    localStorage.removeItem('responsavel');
  }

  ionViewWillEnter() {
    this.responsavel = JSON.parse(localStorage.getItem('responsavel'));
    localStorage.removeItem('responsavel');
    console.log(this.responsavel);
  }

  cadastrarResp(){
    this.navCtrl.navigateForward('/cadastrar-responsavel');
  }

  cadastrarCliente() {
    console.log(this.clienteGroup.value.data_nascimento);
    console.log(this.responsavel);
  }

  calcularIdade() {
    const idade = this.getAge(this.clienteGroup.value.data_nascimento);
    if (idade < 18) {
      this.precisaResponsavel = true;
    } else {
      this.precisaResponsavel = false;
    }
  }

  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

}
