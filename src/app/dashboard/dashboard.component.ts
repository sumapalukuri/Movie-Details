import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { MoviesModel, MoviesResponseModel } from '../models/dashboard.model';
import { MovieDetailPopupComponent } from '../movie-detail-popup/movie-detail-popup.component';
import { DashboardService } from '../service/dashboard/dashboard.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  subjectValue = new Subject<string>()
  moviesList!: MoviesModel[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  pageSize: number = 10;
  pageNo: number = 0;
  length = 10;
  moviesUrl!: string;
  movieResponse!: MoviesResponseModel;
  isLoading = false;
  errorOccured = false;
  errorOccuredTimes = 0;
  pageIndex: number = 0;;
  searchValue = '';
  constructor(private dashboardService: DashboardService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }
/**
 * Function used to get the movie details from the api on component initialization
 */
  ngOnInit(): void {
    this.pageSize = 10;
    this.pageNo = 0;
    this.moviesUrl = 'https://demo.credy.in/api/v1/maya/movies/';
    this.getMoviesList(this.moviesUrl)
  }
/**
 * Fetch the movie details based on the url and find the search results when user try to search
 * @param url : url to get the movie details
 */
  getMoviesList(url: string): void {
    const authToken = localStorage.getItem('token');
    this.isLoading = true;
    this.moviesList = [];
    this.dashboardService.getMoviesDetails(authToken, url).subscribe(response => {
      if (response) {
        this.pageNo = this.pageIndex;
        this.isLoading = false;
        this.searchValue = '';
        this.movieResponse = response;
        this.moviesList = response.results;
        this.length = this.movieResponse.count;
        this.moviesList.forEach(movie => {
          movie['imageUrl'] = `https://ui-avatars.com/api/?name=${movie.title}`;
          if (movie.description.length > 150) {
            movie.shortDescription = `${movie.description.substring(0, 150)}...`;
          } else {
            movie.shortDescription = movie.description;
          }
          if (movie.genres) {
            movie.genresList = movie.genres.split(',')
          }
        })
        this.errorOccuredTimes = 0;
        this.errorOccured = false;
        this.serachResult()
      }
    }, (error) => {
      this.isLoading = false;
      this.errorOccured = true;
      this.errorOccuredTimes += 1;
      this.moviesList = [];
      this.toastr.error('OOPS! Something went wrong. Please click on Refresh button', 'Error Message', {
        positionClass: 'toast-top-center'
      })
    })
  }
  /**
   * Function used to send the required url to get the movies details based on pagination
   * @param event : Paginator event
   */
  pageEvents(event: any) {
    this.pageIndex = event.pageIndex;
    if (event.pageIndex > this.pageNo) {
      this.moviesUrl = this.movieResponse.next;
      this.getMoviesList(this.movieResponse.next)
    } else {
      this.moviesUrl = this.movieResponse.previous;
      this.getMoviesList(this.movieResponse.previous)
    }
  }
/**
 * Function used to open the dialog to see the detail description of movie
 * @param movie : Movie details
 */
  onClickOfCard(movie: MoviesModel): void {
    const dialogRef = this.dialog.open(MovieDetailPopupComponent, {
      width: '450px',
      height: '300px',
      data: movie
    });
  }
  /**
   * Function used to get the user entered input value for filtering
   * @param event : HTML event
   */
  onFilter(event: any) {
    const value = event.target.value;
    this.searchValue = value;
    this.subjectValue.next(value)
  }
/**
 * Function used to return movies list based on search
 */
  serachResult(): void {
    this.subjectValue.pipe(debounceTime(250), distinctUntilChanged()).subscribe(response => {
      if (response.length >= 3) {
        this.moviesList = this.movieResponse.results.filter(movie => (movie.title.toLowerCase().includes(response.toLowerCase()) || movie.genres.toLowerCase().includes(response.toLowerCase())))
      } else {
        this.moviesList = this.movieResponse.results
      }
    })
  }
/**
 * on clickof refresh, trying to reload the page again
 */
  refresh() {
    this.getMoviesList(this.moviesUrl)
  }
}



