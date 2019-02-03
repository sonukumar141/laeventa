import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator} from '../../theme/utils/app-validators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

    constructor(public formBuilder: FormBuilder,
                public router:Router,
                public snackBar: MatSnackBar,
                public auth: AuthService){

    }

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
          'confirm_password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
          });
    }

    public onResetPasswordFormSubmit(values:Object):void {
        this.auth.reset_password(this.resetPasswordForm.value).subscribe(
            () => {
              console.log('success');
              if(this.resetPasswordForm.valid){
                this.snackBar.open('You registered successfully! Sign-in', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                this.router.navigate(['/reset']);
              }
            },
            (errorResponse) => {
              console.log(errorResponse);
            }
          )
        }
}