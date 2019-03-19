import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator} from '../../theme/utils/app-validators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-reset-password-venue',
  templateUrl: './reset-password-venue.component.html',
  styleUrls: ['./reset-password-venue.component.scss']
})
export class ResetPasswordVenueComponent implements OnInit {

  resetPasswordForm: FormGroup;

    constructor(public formBuilder: FormBuilder,
                public router:Router,
                public snackBar: MatSnackBar,
                public auth: AuthService){

    }

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
          'confirm': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
          });
    }

    public onResetPasswordFormSubmit(){
        this.auth.reset_password_venue(this.resetPasswordForm.value).subscribe(
            () => {
              console.log('success');
              if(this.resetPasswordForm.valid){
                this.snackBar.open('Password reset sucessfull. You can Login.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                this.router.navigate(['/sign-in']);
              }
            },
            (errorResponse) => {
              console.log(errorResponse);
              this.snackBar.open('Something went wrong. Try again!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
              this.router.navigate(['/forgot-password']);
            }
          )
        }
}