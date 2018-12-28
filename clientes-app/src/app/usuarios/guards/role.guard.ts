import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated() || this.isTokenExpired()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['role'] as string;
    if (this.authService.hasRole(role)) {
      return true;
    }
    swal('Acceso denegado', `Hola ${this.authService.user.username} no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/directivas']);
    return false;
  }

  isTokenExpired(): boolean {
    let token = this.authService.token;
    let payload = this.authService.getDataToken(token);
    let now = new Date().getTime() / 1000;

    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}
