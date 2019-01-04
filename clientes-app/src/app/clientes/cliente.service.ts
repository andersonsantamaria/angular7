import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { LISTADO_DE_CLIENTES } from './clientes.json';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = environment.host.concat('/api/clientes');

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private addAuthorizationHeader() {
    const token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getListadoDeClientes(): Observable<Cliente[]> {
    return of(LISTADO_DE_CLIENTES);
  }

  private isNoAuthorized(e): boolean {
    if (e.status === 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status === 403) {
      swal('Acceso denegado', `Hola ${this.authService.user.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }

    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones', { headers: this.addAuthorizationHeader() }).pipe(
      catchError(
        e => {
          this.isNoAuthorized(e);
          return throwError(e);
        }
      )
    );
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      catchError(
        e => {
          this.isNoAuthorized(e);
          return throwError(e);
        }
      )
    );
  }
}
