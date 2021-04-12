import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IPersona, Persona } from 'src/app/models/persona.model';


@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona-edit.component.html',
  styleUrls: []
})
export class PersonaEditComponent implements OnInit {

    isSaving = false;
  
    editForm = this.fb.group({
      codigo: [],
      nombre: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      apellido: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      fechaNacimiento: ['', [
        Validators.required
      ]],
      userName: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      identificacion: ['', [
        Validators.required
      ]],
      tipoIdentificacion: ['', [
        Validators.required
      ]],
      estado: ['', [
        Validators.required
      ]]
    });

    constructor(protected personaService: PersonaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const codigo: number = params['codigo'];
      this.personaService.find(codigo).subscribe(
        result => {
          console.log(result.body);
          this.updateForm(result.body);
        }
      );
    });

  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.codigo !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(persona: IPersona): void {
    this.editForm.patchValue({
      codigo: persona.codigo,
      nombre: persona.nombre,
      apellido: persona.apellido,
      fechaNacimiento: persona.fechaNacimiento,
      userName: persona.userName,
      password: persona.password,
      identificacion: persona.identificacion,
      tipoIdentificacion: persona.tipoIdentificacion.codigo,
      estado: persona.estado.codigo,
    });
  }

  protected createFromForm(): IPersona {
    console.log(this.editForm.get(['codigo'])!.value);
    console.log(this.editForm.get(['nombre'])!.value);
    console.log(this.editForm.get(['apellido'])!.value);
    console.log(this.editForm.get(['fechaNacimiento'])!.value
      ? new Date(this.editForm.get(['fechaNacimiento'])!.value) :
      undefined,);
    console.log(this.editForm.get(['userName'])!.value);
    console.log(this.editForm.get(['password'])!.value);
    console.log(this.editForm.get(['identificacion'])!.value);
    console.log(this.editForm.get(['estado'])!.value);
    console.log(this.editForm.get(['tipoIdentificacion'])!.value);

    return {
      ...new Persona(),
      codigo: this.editForm.get(['codigo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value
      ? new Date(this.editForm.get(['fechaNacimiento'])!.value) :
      undefined,
      userName: this.editForm.get(['userName'])!.value,
      password: this.editForm.get(['password'])!.value,
      identificacion: this.editForm.get(['identificacion'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      tipoIdentificacion: this.editForm.get(['tipoIdentificacion'])!.value
    };
  }
}
