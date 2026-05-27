import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'proyecto/:id',
    component: ProjectDetailComponent
  }
];
