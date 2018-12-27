import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { LISTADO_DE_CLIENTES } from './clientes.json';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8081/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getListadoDeClientes(): Observable<Cliente[]> {
    return of(LISTADO_DE_CLIENTES);
  }

  private isNoAuthorized(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
      catchError(
        e => {
          this.isNoAuthorized(e);
          return throwError(e);
        }
      )
    );
  }
}
