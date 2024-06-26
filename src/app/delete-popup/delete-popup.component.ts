import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  errorMessage: string | null = null;
  sucessMessage: string | null = null;

  ngOnInit(): void {
  }
  deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    private movieService: MovieserviceService
  ) {
    this.deleteForm = this.fb.group({
        movieName: ['']
    });
  }

  onSubmit(): void {
    const formValue = this.deleteForm.value;

    this.movieService.deleteMovie(
      formValue.movieName
    ).subscribe(
      response => {
        if(response=='Movie Deleted'){
          this.sucessMessage=response;
          this.errorMessage=null;
        }
        else{
          this.errorMessage='Already Movie is deleted';
          this.sucessMessage=null;
        }
      }
    );
  }
  onClose():void{
    this.dialogRef.close();
  }

}
