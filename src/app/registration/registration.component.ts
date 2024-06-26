import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistrationService } from '../registration.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  phoneNumberError: boolean = false;

  userData = {
    firstName: '',
    lastName: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  }
  constructor(private dialogRef: MatDialogRef<RegistrationComponent>,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  errorMessage: string | null = null;
  sucessMessage: string | null = null;

  onRegistration(): void {
    this.errorMessage = null;
    this.registrationService.register(this.userData).subscribe({
      next: response => {
        if (response == 'LoginID  must be Unique' || response == 'EmailID  must be Unique' || response =='EmailID and LoginID  must be Unique' || response =='Password and Confirm  Password must be same') {
          this.errorMessage = response;
          this.sucessMessage=null;
        }
        else {
          this.sucessMessage= 'Registration SucessFull';
          this.errorMessage=null;
        }
      },
      error: error => {
         console.error('Login failed',error);
      }
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
