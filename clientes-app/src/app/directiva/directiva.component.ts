import { Component, OnInit } from '@angular/core';
import { Region } from '../clientes/region';
import { ClienteService } from '../clientes/cliente.service';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {
  listadoRegiones: Region[];
  habilitarLista = true;

  constructor(private clienteService: ClienteService) { }

  setHabilitarLista(habilitarLista): void {
    this.habilitarLista = habilitarLista;
  }

  ngOnInit() {
    this.consultaDeRegiones();
  }

  consultaDeRegiones(): void {
    this.clienteService.getRegiones().subscribe(
      listadoRegiones => this.listadoRegiones = listadoRegiones
    );
  }
}
