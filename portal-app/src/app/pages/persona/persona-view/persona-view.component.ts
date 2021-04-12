import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPersona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-view',
  templateUrl: './persona-view.component.html',
  styleUrls: [] 
})
export class PersonaViewComponent implements OnInit {

  persona: IPersona | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected service: PersonaService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      const codigo: number = params['codigo'];
      
      this.service.find(codigo).subscribe(
        result => {
          this.persona = result.body;
        }
      );

    });

  }

  previousState(): void {
    window.history.back();
  }

}

