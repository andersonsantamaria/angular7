import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
  title = 'App Angular';

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    swal('Logout', `Hola ${this.authService.user.username}, has cerrado sesión con éxito`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
