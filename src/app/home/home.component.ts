import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogData } from '../login/login-dialog-data';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  images: string[]=[
    'assets/24.jpg',
    'assets/Avengers.jpg',
    'assets/CaptianMarvel.jpg',
    'assets/Dadak.jpg',
    'assets/Hyper.jpg',
    'assets/dabhaang.jpg',
    'assets/Deadpool.jpg',
    'assets/Linga.jpg',
    'assets/Lovestory.jpg',
    'assets/PK.jpg',
    'assets/Premam.jpg',
    'assets/Manifeast.jpg',
    'assets/Master.jpg',
    'assets/Pushpa.jpg',
    'assets/Raazi.jpg',
    'assets/Raees.jpg',
    'assets/JohnWick2.jpg',
    'assets/Sultan.jpg',
    'assets/Super30.jpg',
    'assets/thambi.jpg'
  ];
  openLoginDialog(isAdmin:string):void{
    this.dialog.open(LoginComponent,{
      width:'40%',
      autoFocus:false,
      data:{isAdmin} as LoginDialogData,
      disableClose:true
    });
  }

}
