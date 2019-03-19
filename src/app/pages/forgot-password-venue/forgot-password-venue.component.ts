import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator} from '../../theme/utils/app-validators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgot-password-venue',
  templateUrl: './forgot-password-venue.component.html',
  styleUrls: ['./forgot-password-venue.component.scss']
})
export class ForgotPasswordVenueComponent implements OnInit {

    passwordResetForm: FormGroup;

    constructor(public formBuilder: FormBuilder,
                public router:Router,
                public snackBar: MatSnackBar,
                public auth: AuthService){

    }

    ngOnInit() {
        this.passwordResetForm = this.formBuilder.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])]
          });
    }

    public onPasswordResetFormSubmit() {
        this.auth.forgot_password_venue(this.passwordResetForm.value).subscribe(
            () => {
              console.log('success');
              if(this.passwordResetForm.valid){
                this.snackBar.open('An email has been sent to your email. Please check.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 4000 });
                this.router.navigate(['/sign-in']);
              }
            },
            (errorResponse) => {
              console.log(errorResponse);
              this.snackBar.open('Email not registered. Please enter valid email.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
            }
          )
        }

  logout(){
    this.auth.logout();
    window.location.reload();
  }  
}