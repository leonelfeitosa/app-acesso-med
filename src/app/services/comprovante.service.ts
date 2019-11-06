import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Injectable({
  providedIn: 'root'
})
export class ComprovanteService {

  constructor(private plt: Platform, private file:File, private fileOpener: FileOpener, private sharing: SocialSharing) { }

  public gerarPdf(compra:any): object {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    return pdfMake.createPdf({
      content: [
        { text: "Compra:", style: 'header'},
        { text: `Procedimento: ${compra.procedimento.nome}`, style: 'conteudo' },
        { text: `Valor: R$ ${compra.procedimento.valor}`, style: 'conteudo' },
        { text: `Data da Compra: ${compra.dataCompra}`, style: 'conteudo' },
        { text: `Cliente:`, style: 'header' },
        { text: `Nome: ${compra.cliente.nome}`, style: 'conteudo' },
        { text: `Data de Nascimento: ${compra.cliente.data_nascimento}`, style: 'conteudo' },
        { text: `CPF: ${compra.cliente.cpf}`, style: 'conteudo' },
        { text: `Clinica:`, style: 'header'},
        { text: `Nome: ${compra.clinica.name}`, style: 'conteudo' },
        { text: `CNPJ: ${compra.clinica.cnpj}`, style: 'conteudo' }
      ],
      styles: {
        header: {
          fontSize: 24,
          margin: [0, 16, 0, 0]
        },
        conteudo: {
          fontSize: 18,
          margin: [0, 32, 0, 0]
        }
      }
    });
  }

  public compartilharArquivo(pdf) {
    if (this.plt.is('cordova')) {
      pdf.getBuffer((buffer) => {
        let blob = new Blob([buffer], {type: 'application/pdf'});

        this.file.writeFile(this.file.dataDirectory, 'comprovante.pdf', blob, { replace: true }).then(fileEntry => {
          this.sharing.shareWithOptions({
            files: [this.file.dataDirectory+'comprovante.pdf']
          });
        });
      });
    }
  }
}
