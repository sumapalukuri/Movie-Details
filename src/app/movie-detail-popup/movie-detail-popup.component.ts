import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoviesModel } from '../models/dashboard.model';

@Component({
  selector: 'app-movie-detail-popup',
  templateUrl: './movie-detail-popup.component.html',
  styleUrls: ['./movie-detail-popup.component.scss']
})
export class MovieDetailPopupComponent implements OnInit {
  movie?: MoviesModel
  constructor(
    public dialogRef: MatDialogRef<MovieDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MoviesModel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
