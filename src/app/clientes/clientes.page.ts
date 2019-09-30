import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { LocalService } from '../services/local.service';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';
import { HistoricoClienteComponent } from '../historico-cliente/historico-cliente.component';

@Component ({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  loaded = false;
  clientes: any[] = [];
  filtros: any[] = [];
  filtrosEstado: any[] = [];
  tipoFiltro = new FormControl('nome');
  estadoFiltro = new FormControl('selecione');
  cidadeFiltro = new FormControl('');
  @ViewChild('pesquisaSearchbar', {static: false}) pesquisaSearchbar: IonSearchbar;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  compararEstados = this.compararEstadosFn;
  compararCidades = this.compararCidadesFn;


  constructor(
              private clientesService: ClientesService,
              private localService: LocalService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getClientes();
    this.getEstados();
    this.configureForm();
  }

  getClientes() {
    this.clientesService.getClientes().subscribe((clientes) => {
      this.clientes = [...clientes];
      this.filtros = [...this.clientes];

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
      this.filtros = [...this.clientes];
    } else {
      if (this.tipoFiltro.value === 'nome') {
        this.filtros = this.clientes.filter((cliente) => {
          return cliente.nome.toLowerCase().startsWith(pesquisa.toLowerCase());
        });
      } else {
        this.filtros = this.clientes.filter((cliente) => {
          return cliente.cpf.toLowerCase().startsWith(pesquisa.toLowerCase());
        });
      }
    }
    this.loaded = true;
  }

  filtrarEstado(estado: Estado) {
    this.clearArray(this.filtros);
    if (estado.nome === 'todos') {
      this.filtros = [...this.clientes];
      this.cidadeFiltro.setValue('selecione', {emitEvent: false});
      this.cidadeFiltro.disable();

      this.clearArray(this.cidades);
    } else {
      this.filtrosEstado = this.clientes.filter((cliente) => {
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

  historico(cliente) {
    this.modalCtrl.create({
      component: HistoricoClienteComponent,
      componentProps: {
        cliente
      }
    }).then((modal) => {
      modal.present();
    });
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

  configureForm() {
    this.tipoFiltro.valueChanges.subscribe((value) => {
      this.pesquisaSearchbar.value = '';
      if (value === 'cpf') {
        this.pesquisaSearchbar.type = 'number';
      } else {
        this.pesquisaSearchbar.type = 'text';
      }
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

}
