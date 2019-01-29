import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator} from '../../theme/utils/app-validators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

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

    public onPasswordResetFormSubmit(values:Object):void {
        this.auth.password_reset(this.passwordResetForm.value).subscribe(
            () => {
              console.log('success');
              if(this.passwordResetForm.valid){
                this.snackBar.open('You registered successfully! Sign-in', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                this.router.navigate(['/forgot']);
              }
            },
            (errorResponse) => {
              console.log(errorResponse);
            }
          )
        }
}