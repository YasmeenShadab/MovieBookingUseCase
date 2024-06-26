import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Movie {
  movieName: string;
  totalTickets: number;
  theatre: string;
  status: string;
}

interface Book {
  userName: string;
  movieName: string;
  theater: string;
  numberOfTicketsBooked: number;
}

interface movieUpdateDeleteData {
  movieName: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('https://localhost:44319/api/v1.0/moviebooking/GetAllMovies');
  }
  private apiUrl = 'https://localhost:44319/api/v1.0/moviebooking';

  getMovieByName(movieName: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/searchbyname?movieName=${movieName}`);
  }

  bookTickets(userName: string, movieName: string, theater: string, numberOfTicketsBooked: number): Observable<any> {
    const body = {
      userName,
      movieName,
      theater,
      numberOfTicketsBooked,
    };

    return this.http.post<any>(`${this.apiUrl}/Book`, body);
  }

  addMovie(movieName: string, totalTickets: number, theatre: string, status: string): Observable<any> {
    const body = {
      movieName,
      totalTickets,
      theatre,
      status
    };

    return this.http.post<any>(`${this.apiUrl}/add`, body);
  }

  deleteMovie(movieName: string): Observable<any> {
    const params = new HttpParams().set('movieName', movieName);

    return this.http.delete<any>(`${this.apiUrl}/delete`, { params });
  }

  updateMovie(movieName: string): Observable<any> {
    const params = new HttpParams().set('movieName', movieName);
  
    return this.http.put<any>(`${this.apiUrl}/update`,{}, {params});
  }


}


