import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogData } from './login-dialog-data';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { RegistrationComponent } from '../registration/registration.component';
import { RegistrationService } from '../registration.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    loginId:'',
    password:''
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: LoginDialogData,private dialogRef: MatDialogRef<LoginComponent>,
  private dialog : MatDialog, private registrationService: RegistrationService,private router: Router) {
    if(data.isAdmin==='admin'){
      this.loginData.loginId='Admin'
    }
   }

   errorMessage: string | null = null;
   sucessMessage: string | null = null;

  ngOnInit(): void {
  }

  onLogin(isAdmin:string):void{
    if(isAdmin=='user'){
      this.registrationService.login(this.loginData).subscribe({
        next: response=>{
          if(response==true){
            this.sucessMessage='Login Sucessful';
            this.errorMessage=null;
           this.router.navigate(['/book']);
            //this.router.navigate(['/parent']);
            this.dialogRef.close();
        }
          else{
            this.errorMessage='Unable to login, Please check LoginId and Password and try Again';
            this.sucessMessage=null;
          }
        },
        error: error=>{
          console.error('Login failed',error);
        }
    });
    }
    else{
      this.registrationService.login(this.loginData).subscribe({
        next: response=>{
          if(response==true){
            this.sucessMessage='Login Sucessful';
            this.errorMessage=null;
            this.router.navigate(['/admin']);
            this.dialogRef.close();
        }
          else{
            this.errorMessage='Unable to login, Please check LoginId and Password and try Again';
            this.sucessMessage=null;
          }
        },
        error: error=>{
          console.error('Login failed',error);
        }
    });
    }
  }

  openForgetPasswordDialod():void{
    this.dialog.open(ForgetPasswordComponent,{
      width:'40%',
      autoFocus:false,
      disableClose:true
    });
  }

  openRegistrationDialog():void{
    this.dialog.open(RegistrationComponent,{
      width:'40%',
      maxHeight:'80vh',
      autoFocus:false,
      disableClose:true
    });
  }
  
  onClose():void{
    this.dialogRef.close();
  }


}
