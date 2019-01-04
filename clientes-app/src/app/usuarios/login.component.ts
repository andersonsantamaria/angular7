import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor inicia sesión!";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal('Inicio de sesión', `Hola ${this.authService.user.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/directivas']);
    }
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null || this.usuario.username === '' || this.usuario.password === '') {
      swal('Error en inicio de sesión', 'Usuario o Contraseña vacíos!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        this.authService.saveUser(response.access_token);
        this.authService.saveToken(response.access_token);

        const usuario = this.authService.user;

        this.router.navigate(['/directivas']);
        swal('Inicio de sesión', `Hola ${usuario.username}, has iniciado sesión con éxito`, 'success');
      },
      error => {
        if (error.status == 400) {
          swal('Error en inicio de sesión', 'Usuario o Contraseña incorrectos!', 'error');
        }
      }
    );
  }
}
