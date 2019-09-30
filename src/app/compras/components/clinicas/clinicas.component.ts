import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { Clinica } from '../../../models/clinica';
import { Estado } from '../../../models/estado';
import { Cidade } from '../../../models/cidade';
import { DetalhesClinicaComponent } from '../../../detalhes-clinica/detalhes-clinica.component';
import { ClinicasService } from '../../../services/clinicas.service';
import { LocalService } from '../../../services/local.service';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss'],
})
export class ClinicasComponent implements OnInit {

  loaded = false;
  filtros: Clinica[] = [];
  filtrosEstado: Clinica[] = [];
  @ViewChild('pesquisaSearchbar', { static: false }) pesquisaSearchbar: IonSearchbar;
  tipoFiltro = new FormControl('nome');
  clinicas: Clinica[] = [];
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  estadoFiltro = new FormControl('selecione');
  cidadeFiltro = new FormControl('seleciona');
  compararEstados = this.compararEstadosFn;
  compararCidades = this.compararCidadesFn;

  constructor(private modalCtrl: ModalController,
              private clinicasService: ClinicasService,
              private localService: LocalService,
              private navController: NavController) { }

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

  async selecionarProcedimento(clinica: Clinica) {
    const modal = await this.modalCtrl.create({
      component: DetalhesClinicaComponent,
      componentProps: {
        clinica,
        isCompra: true
      }
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      const compra = JSON.parse(localStorage.getItem('newCompra'));
      compra.clinica = data.data.clinica;
      compra.procedimento = data.data.procedimento;
      localStorage.setItem('newCompra', JSON.stringify(compra));
      this.resumo();
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

  resumo() {
    this.navController.navigateForward('/home/compras/resumo');
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

  filtroPesquisa(event) {
    this.pesquisaSearchbar.value = '';
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
