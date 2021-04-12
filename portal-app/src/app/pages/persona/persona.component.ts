import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IPersona } from '../../models/persona.model';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
})
export class PersonaComponent implements OnInit {
  personas?: IPersona[];
  isLoading = false;

  constructor(
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {

    this.personaService.findAll().subscribe(
      response => {
        console.log(response.body);
        this.personas = response.body;
      }
    );

  }



  delete(persona: IPersona): void {
    /*
    const modalRef = this.modalService.open(PersonaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.persona = persona;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });*/
  }


  hashPassword(password: string){
    return "*".repeat(password.length)
  }

}
