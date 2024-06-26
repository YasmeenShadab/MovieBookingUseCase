import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-book-popup',
  templateUrl: './book-popup.component.html',
  styleUrls: ['./book-popup.component.css']
})
export class BookPopupComponent {
  bookForm: FormGroup;
 
  errorMessage: string | null = null;
  sucessMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<BookPopupComponent>,
    private movieService: MovieserviceService
  ) {
    this.bookForm = this.fb.group({
      userName: [''],
      movieName: [''],
      theater: [''],
      numberOfTicketsBooked: 0
    });
  }

  onSubmit(): void {
    const formValue = this.bookForm.value;

    this.movieService.bookTickets(
      formValue.userName,
      formValue.movieName,
      formValue.theater,
      formValue.numberOfTicketsBooked
    ).subscribe(
      response => {
       if(response=='Tickect Booked Sucessfully'){
        this.sucessMessage=response;
        this.errorMessage=null;
       }
        else{
          this.sucessMessage=null;
        this.errorMessage=response;
        }
      }
    );
  }
  onClose():void{
    this.dialogRef.close();
  }
}
