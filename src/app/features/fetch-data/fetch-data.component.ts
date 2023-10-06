import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fetch-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
})
export class FetchDataComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  forecasts!: WeatherForecast[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<WeatherForecast[]>('http://localhost:40080/api/WeatherForecast')
      .subscribe((data: WeatherForecast[]) => (this.forecasts = data));
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
