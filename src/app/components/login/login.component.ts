import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthServiceService } from 'src/app/services/auth-service.service';


declare var JQuery:any;
declare var $:any
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any = {
    username:'',
    password:''
  };

  public usuario: any = {};
  public token: any = '';

  constructor (
    private authService: AuthServiceService,
    private _router: Router, 
  ) {
    this.token = this.authService.getToken();
  }

  ngOnInit() {
    if (this.token) {
      this._router.navigate(['/index']);
    }
  }
  

  login(loginForm:any) {
    if(loginForm.valid){
      let data = {
        username: this.user.username,
        password: this.user.password,
      };
      this.authService.login(data).subscribe(
        response=>{
          if (response.error === 'Unauthorized') {
            iziToast.error({
              title: 'ERROR',
              message: response.message,
              position: 'topRight'
            });
          }else {
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            this._router.navigate(['/index']);
          }
        }, error =>{
          console.error('Error al intentar iniciar sesión:', error);
    const errorMessage = error.error?.message || 'Error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
    iziToast.error({
      title: 'ERROR',
      message: errorMessage,
      position: 'topRight'
        });
      })
    }
  }
}
