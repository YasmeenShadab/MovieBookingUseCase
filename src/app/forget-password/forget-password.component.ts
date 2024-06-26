import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  passwordData={
    loginID: '',
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  }
  constructor(private dialogRef: MatDialogRef<ForgetPasswordComponent>,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  errorMessage: string | null = null;
  sucessMessage: string | null = null;

  onReset():void{
    this.registrationService.resetPassword(this.passwordData).subscribe({
      next: response=>{
         if (response == 'New Password and Confirm New Password must be same') {
          this.errorMessage = response;
          this.sucessMessage=null;
        }
        else if(response==true) {
          this.sucessMessage= 'Password Reset SucessFull';
          this.errorMessage=null;
        }
        else{
          this.errorMessage = 'LoginId or Email Id does not exist or old passwords cannot be used';
          this.sucessMessage=null;
        }
      },
      error: error=>{
        console.error('Password Reset failed',error);
      }
  });
  }

  onClose():void{
    this.dialogRef.close();
  }

}
