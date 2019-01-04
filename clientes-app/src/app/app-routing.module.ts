import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './usuarios/login.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { RoleGuard } from './usuarios/guards/role.guard';


const routes: Routes = [
    { path: '', redirectTo: '/directivas', pathMatch: 'full' },
    { path: 'directivas', component: DirectivaComponent, canActivate: [AuthGuard] },
    { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
    { path: 'login', component: LoginComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  export const APP_ROUTING = RouterModule.forRoot(routes);
