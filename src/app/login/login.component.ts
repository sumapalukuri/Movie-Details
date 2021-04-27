import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginPayload, LoginResponseModel } from '../models/login.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  buttonDisabled = false;
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router,
    private toastr: ToastrService) { }
  /**
   * Function used to initialise the login form
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  /**
   * Function used to call the login api and on success routing it to dashboard
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.buttonDisabled = true;
      const payload: LoginPayload = {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      }
      this.loginService.postLoginDetails(payload).subscribe((response: LoginResponseModel) => {
        if (response.is_success) {
          this.buttonDisabled = false;
          localStorage.setItem('token', response.data.token)
          this.route.navigate(['/dashboard'])
        }
      },
        (error) => {
          this.buttonDisabled = false;
          if (error.status === 400 || error.status === 404) {
            this.toastr.error('Invalid Login Credentials', 'Error Message', {
              timeOut: 4000, positionClass: 'toast-top-center'
            })
          } else {
            this.toastr.error('OOPS! Something went wrong. Please try again', 'Error Message', {
              timeOut: 4000, positionClass: 'toast-top-center'
            })
          }
        })
    }
  }
}
