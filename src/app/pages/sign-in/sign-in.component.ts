import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  errors: any[] = [];

  constructor(public formBuilder: FormBuilder, 
              public router:Router, 
              public snackBar: MatSnackBar,
              public auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'passwordConfirmation': ['', Validators.required]
    },{validator: matchingPasswords('password', 'passwordConfirmation')});

  }

  public onLoginFormSubmit() {
    if (this.loginForm.valid) {
      this.auth.hotel_signin(this.loginForm.value).subscribe(
        (token) => {
          this.router.navigate(['/venues']);
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
          //this.snackBar.open('Wrong email or password', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });

       this.auth.signin(this.loginForm.value).subscribe(
        (token) => {
          this.router.navigate(['/']);
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
          //this.snackBar.open('Wrong email or password', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
      }
  }

  public onRegisterFormSubmit(){

    this.auth.signup(this.registerForm.value).subscribe(
      () => {
        console.log('success');
        if(this.registerForm.valid){
          this.snackBar.open('Registered successfully.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 4000 });
          
          this.registerForm.reset();
          //this.router.navigate(['/sign-in']);
          //window.location.reload();
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
        this.snackBar.open('Email already registered', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    )
  }

  refresh(): void {
    window.location.reload();
}
logout(){
  this.auth.logout();
  this.router.navigate(['/forgot']);
}  

}
