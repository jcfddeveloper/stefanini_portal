import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPersona, getPersonaIdentifier } from '../models/persona.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<IPersona>;
export type EntityArrayResponseType = HttpResponse<IPersona[]>;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public resourceUrl = 'http://localhost:8080/api/persona';

  constructor(protected http: HttpClient) { }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http
    .get<IPersona[]>(`${this.resourceUrl}/`, { observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPersona>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  create(persona: IPersona): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(persona);
    return this.http
      .post<IPersona>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(persona: IPersona): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(persona);
    return this.http
      .put<IPersona>(`${this.resourceUrl}/${getPersonaIdentifier(persona) as number}`, copy, { observe: 'response' } )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromClient(persona: IPersona): IPersona {
    return Object.assign({}, persona, {
      fechaNacimiento: persona.fechaNacimiento ? persona.fechaNacimiento.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento ? res.body.fechaNacimiento : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((persona: IPersona) => {
        persona.fechaNacimiento = persona.fechaNacimiento ? persona.fechaNacimiento : undefined;
      });
    }
    return res;
  }

}
