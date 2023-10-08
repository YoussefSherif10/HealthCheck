import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-health-check',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css'],
})
export class HealthCheckComponent implements OnInit {
  checks!: Check[];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get<Check[]>('http://localhost:40080/api/health')
      .subscribe((data: any) => (this.checks = data['checks']));
  }
}

interface Check {
  name: string;
  responseTime: number;
  status: string;
  description: string;
}
