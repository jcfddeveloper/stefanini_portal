import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { HomeComponent } from './pages/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './pages/registro/registro.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PersonaEditComponent } from './pages/persona/persona-edit/persona-edit.component';
import { PersonaViewComponent } from './pages/persona/persona-view/persona-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonaComponent,
    PersonaEditComponent,
    PersonaViewComponent,
    HomeComponent,
    RegistroComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
