import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from '../shared/auth.service';
import { Userh } from '../../app.models';

@Component({
  selector: 'app-hotel-sign-in',
  templateUrl: './hotel-sign-in.component.html',
  styleUrls: ['./hotel-sign-in.component.scss']
})
export class HotelSignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  newUserh: Userh;
  userhCategory =  Userh.CATEGORIES;
  

  constructor(public formBuilder: FormBuilder, 
              public router:Router, 
              public snackBar: MatSnackBar,
              public auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });
    // Hotel registration form controls
    this.registerForm = this.formBuilder.group({
      'category': ['', Validators.required],
      'businessName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'password': ['', Validators.required],
      'passwordConfirmation': ['', Validators.required]
    },{validator: matchingPasswords('password', 'passwordConfirmation')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
  }

  public onRegisterFormSubmit() {
    this.auth.hotel_signup(this.registerForm.value).subscribe(
      () => {
        console.log('success');
        if(this.registerForm.valid){
          this.snackBar.open('You registered successfully! Sign-in', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/sign-in']);
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    )
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/forgot-password']);
  }

}
