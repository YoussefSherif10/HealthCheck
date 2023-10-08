import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'fetch-data',
    loadComponent: () =>
      import('./features/fetch-data/fetch-data.component').then(
        (m) => m.FetchDataComponent
      ),
  },
  {
    path: 'health-check',
    loadComponent: () =>
      import('./features/health-check/health-check.component').then(
        (m) => m.HealthCheckComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
