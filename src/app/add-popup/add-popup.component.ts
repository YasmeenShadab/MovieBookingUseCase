import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css']
})
export class AddPopupComponent implements OnInit {

  errorMessage: string | null = null;
  sucessMessage: string | null = null;

  ngOnInit(): void {
  }

  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddPopupComponent>,
    private movieService: MovieserviceService
  ) {
    this.bookForm = this.fb.group({
      movieName: [''],
      totalTickets: [0],
      theatre: [''],
      status: ['']
    });
  }

  onSubmit(): void {
    const formValue = this.bookForm.value;

    this.movieService.addMovie(
      formValue.movieName,
      formValue.totalTickets,
      formValue.theatre,
      formValue.status
    ).subscribe(
      response => {
        if(response=='Added Succesfully'){
          this.sucessMessage=response;
          this.errorMessage=null;
        }
        else{
          this.errorMessage='Movie Not able to Add.';
          this.sucessMessage=null;
        }
      }
    );
  }
  onClose():void{
    this.dialogRef.close();
  }
}
