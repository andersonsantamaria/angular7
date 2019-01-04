import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Usuario;
  private _token: string;

  constructor(private httpClient: HttpClient) { }

  public get user(): Usuario {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as Usuario;
      return this._user;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = environment.host.concat('/oauth/token');

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    const credentials = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials
    });

    return this.httpClient.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  saveUser(access_token: string): void {
    const payload = this.getDataToken(access_token);
    this._user = new Usuario();
    this._user.nombre = payload.nombre;
    this._user.apellido = payload.apellido;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem('token', access_token);
  }

  getDataToken(access_token: string): any {
    if (access_token != null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const payload = this.getDataToken(this.token);
    if (payload != null && payload.user_name != null && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._user = null;
    // sirve para limpiar todo el sessionStorage sessionStorage.clear();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  hasRole(role: string): boolean {
    return this.user.roles.includes(role);
  }
}
