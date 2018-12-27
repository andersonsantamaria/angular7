import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { LISTADO_DE_CLIENTES } from './clientes.json';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getListadoDeClientes(): Observable<Cliente[]> {
    return of(LISTADO_DE_CLIENTES);
  }
}
