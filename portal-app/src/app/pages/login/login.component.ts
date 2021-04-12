import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = false;

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }
  }

  login(form: NgForm) {

    if (form.invalid) {
      return true;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(
      resp => {

        // console.log(resp);

        if (this.recordarUsuario) {
          localStorage.setItem('email', this.usuario.email);
        }

        Swal.close();
        this.router.navigateByUrl('/home');
      },
      err => {

        Swal.fire({
          allowOutsideClick: true,
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });

      }
    );
  }

}
