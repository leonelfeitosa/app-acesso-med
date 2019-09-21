import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClinicasService } from '../services/clinicas.service';
import { FormControl } from '@angular/forms';
import { Clinica } from '../models/clinica';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { DetalhesClinicaComponent } from '../detalhes-clinica/detalhes-clinica.component';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.page.html',
  styleUrls: ['./clinicas.page.scss'],
})
export class ClinicasPage implements OnInit {

  constructor(private clinicasService: ClinicasService,
              private modalCtrl: ModalController) { }

  @ViewChild('pesquisaSearchbar', {static: false}) pesquisaSearchbar: IonSearchbar;
  clinicas: Clinica[] = [];
  loaded = false;
  tipoFiltro = new FormControl('nome');
  filtros: Clinica[] = [];
  pesquisaTexto = '';

  ngOnInit() {
    this.getClinicas();
    this.tipoFiltro.valueChanges.subscribe((value) => {
      this.filtroPesquisa(value);
    });
  }

  getClinicas() {
    this.clinicasService.getClinicas().subscribe((clinicas) => {
      this.clinicas = clinicas;
      this.filtros = [...this.clinicas];
      this.loaded = true;
    });
  }

  filtroPesquisa(event) {
    this.pesquisaSearchbar.value = '';
  }

  pesquisa(event) {
    const pesquisa: string = this.pesquisaSearchbar.value;
    this.clearArray(this.filtros);
    this.loaded = false;
    if (pesquisa === '') {
      this.filtros = [...this.clinicas];
    } else {
      if (this.tipoFiltro.value === 'nome') {
        this.filtros = this.clinicas.filter((clinica) => {
          if (clinica.name.toLowerCase().startsWith(pesquisa.toLowerCase())) {
            return true;
          }
          return false;
        });
      } else if (this.tipoFiltro.value === 'procedimento') {
        this.clinicas.forEach((clinica) => {
          if (typeof clinica.procedimentos !== 'undefined') {
            clinica.procedimentos.forEach((procedimento) => {
              if (procedimento.nome.toLowerCase().startsWith(pesquisa.toLowerCase())) {
                this.filtros.push(clinica);
              }
            });
          }
        });
      } else if (this.tipoFiltro.value === 'especialidade') {
        this.clinicas.forEach((clinica) => {
          if (typeof clinica.procedimentos !== 'undefined') {
            clinica.especialidades.forEach((especialidade) => {
              if (especialidade.toLowerCase().startsWith(pesquisa.toLowerCase())) {
                this.filtros.push(clinica);
              }
            });
          }
        });
      }
    }
    this.loaded = true;
  }

  async detalhesClinica(clinica: Clinica) {
    const modal = await this.modalCtrl.create({
      component: DetalhesClinicaComponent,
      componentProps: {
        clinica
      },
      cssClass: ['modal-clinicas']
    });
    modal.present();
  }

  clearArray(array: any[]) {
    while (array.length > 0) {
      array.pop();
    }
  }

}
