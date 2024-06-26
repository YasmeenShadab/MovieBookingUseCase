import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MovieserviceService } from '../movieservice.service';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {

 
  errorMessage: string | null = null;
  sucessMessage: string | null = null;

  ngOnInit(): void {
  }
  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
    private movieService: MovieserviceService
  ) {
    this.updateForm = this.fb.group({
        movieName: ['']
    });
  }

  onSubmit(): void {
    const formValue = this.updateForm.value;

    this.movieService.updateMovie(
      formValue.movieName
    ).subscribe(
      response => {
        if(response=='Movie Updated'){
          this.errorMessage=null;
          this.sucessMessage=response;
        }
        else{
          this.sucessMessage=null;
          this.errorMessage='Already Movie is updated';
        }
      }
    );
  }
  onClose():void{
    this.dialogRef.close();
  }

}
