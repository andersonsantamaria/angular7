import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  listadoClientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getListadoDeClientes().subscribe(
      listadoClientes => this.listadoClientes = listadoClientes
    );
  }

}