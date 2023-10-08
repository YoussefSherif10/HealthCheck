import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-fetch-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatTableModule],
  templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  displayedColumns: string[] = ['date', 'Temp. (C)', 'Temp. (F)', 'summary'];
  dataSource!: WeatherForecast[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.http
      .get<WeatherForecast[]>('http://localhost:40080/api/WeatherForecast')
      .subscribe((data: WeatherForecast[]) => {
        this.dataSource = data;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
