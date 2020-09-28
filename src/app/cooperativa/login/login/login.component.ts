import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f', { static: true }) floatingLabelForm: NgForm;
  @ViewChild('vform', { static: true }) validationForm: FormGroup;

  loginform = true;
  recoverform = false;

  formLogin: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.createFormLogin();
  }

  createFormLogin() {
    // debugger;
    this.formLogin = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required, Validators.maxLength(25), Validators.minLength(7)]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(25)]),
    }, {updateOn: 'blur'});
  }


  submit() {
    // $event.preventDefault();

    for (let c in this.formLogin.controls) {
      this.formLogin.controls[c].markAsTouched();
    }
    if (this.formLogin.valid) {
      // this.spinner.show();
      this.loginService.login(this.formLogin.value)
        .subscribe(
          (response: any) => {
            // this.spinner.hide();
            localStorage.setItem("token", response.access_token);
            localStorage.setItem('user_session', JSON.stringify(response));
            this.router.navigate(["/home"]);
          }, (error: any) => {
            // this.spinner.hide();
            if (error.message) {
              // this.toastr.error('', error.message);
            } else {
              // this.toastr.error('', 'Hay errores contacte con el proveedor');
              console.log('Existe un error con el proveedor')
            }
            console.log('errores: ', error.message);
          }
        )
    } else {
      // this.toastr.error('', 'Revise los campos en rojo');
      console.log('Hay un posible error')
    }
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  onReactiveFormSubmit() {
    this.formLogin.reset();
  }
  onTemplateFormSubmit() {
    // this.floatingLabelForm.reset();
  }
  onCustomFormSubmit() {
    this.validationForm.reset();
  }
}
