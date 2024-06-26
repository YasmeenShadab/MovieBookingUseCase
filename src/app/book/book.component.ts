import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookPopupComponent } from '../book-popup/book-popup.component';
import { MovieserviceService } from '../movieservice.service';

interface Movie{
  movieName: string,
  totalTickets: number,
  theatre: string,
  status: string
}
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  showMovies = false;
  fetched = false;
  getForm: FormGroup;
  constructor( 
      private fb: FormBuilder,public dialog: MatDialog,private movieService: MovieserviceService) { 
    this.getForm = this.fb.group({
      movieName: ['']
  });
   }
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

  

  openDialog(): void {
    const dialogRef = this.dialog.open(BookPopupComponent, {
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
        console.log(this.fetchedMovie)
        this.showMovies = false;
        this.fetched=true;
      }
    );
  }

  getMovie(): void {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies;
        this.showMovies= true;
        this.fetched=false;
      }
    );
  }

  getMovieImage(movieName: string): string{
    const imageUrl = `assets/${movieName}.jpg`;
    // const img = new Image();
    // img.src = imageUrl;

    return imageUrl ;
  }

}
