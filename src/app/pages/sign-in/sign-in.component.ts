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

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.auth.hotel_signin(this.loginForm.value).subscribe(
        (token) => {
          this.refresh();
          this.router.navigate(['/products']);
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
        });

      this.auth.vendor_signin(this.loginForm.value).subscribe(
        (token) => {
          this.refresh();
          this.router.navigate(['/products']);
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
        });
 
      this.auth.signin(this.loginForm.value).subscribe(
        (token) => {
          
          this.router.navigate(['/products']);
          this.refresh();
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
          
        });

      
    }
  }

  public onRegisterFormSubmit(values:Object):void {

    this.auth.signup(this.registerForm.value).subscribe(
      () => {
        console.log('success');
        if(this.registerForm.valid){
          this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/sign-in']);
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    )
  }

  refresh(): void {
    window.location.reload();
}

}
