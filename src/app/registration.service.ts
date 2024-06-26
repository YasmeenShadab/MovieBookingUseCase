import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginModel{
  loginId:string;
  password:string;
}

interface UserRegistrationModel{
  firstName:string;
  lastName:string;
  email:string;
  loginId:string;
  password:string;
  confirmPassword:string;
  phoneNumber:string;
}

interface ResetPasswordDataModel{
  loginID: string,
  email: string,
  newPassword: string,
  confirmNewPassword: string
}


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http:HttpClient) { }

  register(userData: UserRegistrationModel):Observable<any>{
    return this.http.post<any>('https://localhost:44319/api/v1.0/moviebooking/register', userData);
  }

  login(loginData: LoginModel):Observable<any>{
    const params = new HttpParams()
    .set('loginId',loginData.loginId)
    .set('password',loginData.password);

    return this.http.get('https://localhost:44319/api/v1.0/moviebooking/login',{params});
  }

  resetPassword(passwordData: ResetPasswordDataModel):Observable<any>{
    return this.http.post<any>('https://localhost:44319/api/v1.0/moviebooking/forgetPassword', passwordData);
  }
}
