import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClinicasService } from '../services/clinicas.service';
import { FormControl } from '@angular/forms';
import { Clinica } from '../models/clinica';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';
import { LocalService } from '../services/local.service';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { DetalhesClinicaComponent } from '../detalhes-clinica/detalhes-clinica.component';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.page.html',
  styleUrls: ['./clinicas.page.scss'],
})
export class ClinicasPage implements OnInit {

  constructor(private clinicasService: ClinicasService,
              private modalCtrl: ModalController,
              private localService: LocalService) { }

  @ViewChild('pesquisaSearchbar', {static: false}) pesquisaSearchbar: IonSearchbar;
  clinicas: Clinica[] = [];
  loaded = false;
  tipoFiltro = new FormControl('nome');
  filtros: Clinica[] = [];
  filtrosEstado: Clinica[] = [];
  pesquisaTexto = '';
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  estadoFiltro = new FormControl('selecione');
  cidadeFiltro = new FormControl('seleciona');
  compararEstados = this.compararEstadosFn;
  compararCidades = this.compararCidadesFn;

  ngOnInit() {
    this.getClinicas();
    this.getEstados();
    this.configureForm();
  }

  getClinicas() {
    this.clinicasService.getClinicas().subscribe((clinicas) => {
      this.clinicas = clinicas;
      this.filtros = [...this.clinicas];
      this.loaded = true;
    });
  }
  getEstados() {
    this.localService.getEstados().subscribe((estados) => {
      this.estados = [...estados];
      this.loaded = true;
    });
  }
  getCidades(estado: Estado) {
    this.localService.getCidades(estado.id).subscribe((cidades) => {
      this.cidades = [...cidades];
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

  configureForm() {
    this.tipoFiltro.valueChanges.subscribe((value) => {
      this.filtroPesquisa(value);
    });
    this.cidadeFiltro.disable();
    this.estadoFiltro.valueChanges.subscribe((value) => {
      this.filtrarEstado(value);
    });
    this.cidadeFiltro.valueChanges.subscribe((value) => {
      if (typeof value === 'object') {
        this.filtrarCidade(value);
      }
    });
  }

  filtrarEstado(estado: Estado) {
    this.clearArray(this.filtros);
    if (estado.nome === 'todos') {
      this.filtros = [...this.clinicas];
      this.cidadeFiltro.setValue('selecione', {emitEvent: false});
      this.cidadeFiltro.disable();

      this.clearArray(this.cidades);
    } else {
      this.filtrosEstado = this.clinicas.filter((cliente) => {
        if (typeof cliente.estado !== 'undefined') {
          return cliente.estado.toLowerCase() === estado.sigla.toLowerCase();
        }
      });
      this.cidadeFiltro.enable();
      this.cidadeFiltro.setValue('selecione', {emitEvent: false});
      this.clearArray(this.cidades);
      this.getCidades(estado);
      this.filtros = [...this.filtrosEstado];
    }
  }

  filtrarCidade(cidade: Cidade) {
    this.clearArray(this.filtros);
    if (cidade.nome === 'todos') {
      this.filtros = [...this.filtrosEstado];
    } else {
      this.filtros = this.filtrosEstado.filter((cliente) => {
        if (typeof cliente.cidade !== 'undefined') {
          return cliente.cidade.toLowerCase() === cidade.nome.toLowerCase();
        }
      });
    }
  }

  clearArray(array: any[]) {
    while (array.length > 0) {
      array.pop();
    }
  }

  compararEstadosFn(o1, o2) {
    return o1.sigla === o2.sigla;
  }
  compararCidadesFn(o1, o2) {
    return o1.nome === o2.nome;
  }

}
