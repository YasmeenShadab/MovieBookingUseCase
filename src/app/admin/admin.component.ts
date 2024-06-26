import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddPopupComponent } from '../add-popup/add-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MovieserviceService } from '../movieservice.service';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

interface Movie{
  movieName: string,
  totalTickets: number,
  theatre: string,
  status: string
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showMovies = false;
  fetched = false;
  getForm: FormGroup;
  movies: Movie[] = [];
  fetchedMovie: any = {
    movieName: '',
    status: '',
    theatre: '',
    totalTickets: 0
  };
  ngOnInit(): void {
    this.getMovie();
  }
  
  constructor(private fb: FormBuilder,public dialog: MatDialog, private movieService:MovieserviceService) {
    this.getForm = this.fb.group({
      movieName: ['']
  });
   }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width:'40%',
      autoFocus:false,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit(): void {
    const formValue = this.getForm.value;

    this.movieService.getMovieByName(
      formValue.movieName
    ).subscribe(
      fetchedMovie => {
        this.fetchedMovie = fetchedMovie;
        this.showMovies = false;
        this.fetched=true;
      }
    );
  }

  openDialogUpdate(): void {
    const dialogRef = this.dialog.open(UpdatePopupComponent, {
      width:'40%',
      autoFocus:false,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width:'40%',
      autoFocus:false,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getMovie(): void {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        this.showMovies= true;
      }
    );
  }

  getMovieImage(movieName: string): string{
    const imageUrl = `assets/${movieName}.jpg`;
    const img = new Image();
    img.src = imageUrl;

    return imageUrl ;
  }
}
