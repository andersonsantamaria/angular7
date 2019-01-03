import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login with credencials null', () => {
    // arrange
    // act
    component.login();
    // assert
    expect(component.usuario.id).toBe(undefined);
    expect(component.usuario.username).toBe(undefined);
    expect(component.usuario.password).toBe(undefined);
    expect(component.usuario.nombre).toBe(undefined);
    expect(component.usuario.apellido).toBe(undefined);
    expect(component.usuario.email).toBe(undefined);
  });

  it('login ok', () => {
    //arrange
    component.usuario.username = 'admin';
    component.usuario.password = '12345';
    const response: = {accessToken : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhcGVsbGlkbyI6IlNhbnRhbWFyaWEiLCJjb21pZGFfZmF2b3JpdGEiOiJjb21pZGEgZGUgbWFyIiwiZXhwIjoxNTQ2NTQ2NzU1LCJub21icmUiOiJBbmRlcnNvbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiODk4NDUzOGMtZDczYS00MDBiLWE4NGEtY2M5NTQ1ZTBmMzJhIiwiZW1haWwiOiJhbmRlcnNvbi5zYW50YW1hcmlhQGNlaWJhLmNvbS5jbyIsImNsaWVudF9pZCI6ImFuZ3VsYXJhcHAifQ.eadbFv2NUWEy_krxygeAOXORTXuaQQlCTRbxQWSwzsdmm2qtWzwKSxA9wFHXqKL-bTC5IY00rWmFYnm3x0IhpWgFXwva1LFfaJTBMmd1VHQPlwppaas8umCJyCnd_M4IxcU9gMvuVdsyCH6ePts_ptLNzH8b43z_sy3NqHe0JVBCBPmVEHK32QSOAUSEhFF633MJFl8A8kdF4B0mQ6_dlvPAPc5dt91vubaGAzVKhv7F87IXvzyshq1Pvpo4lQywWCu9G2LhDCKTe_9ia8pTH9m3VwFMtvZ3rt6Z8ei65hHP5psqDC8AgT3LPkOrGW9FKdo5IiJLjRO1emeLQm_6pA'};

    const authService = TestBed.get(AuthService); // Get the needed service
    spyOn(authService, 'login').and.returnValue(Observable.of(usuario));
 
    //act
    component.login();
    //assert
    expect(component.usuario.username).toBe('admin');
  });
});
