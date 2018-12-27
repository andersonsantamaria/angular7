import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  habilitarLista: boolean = true;

  constructor() { }

  setHabilitarLista(habilitarLista): void{
    this.habilitarLista = habilitarLista;
  }
}
