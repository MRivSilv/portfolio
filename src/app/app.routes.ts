import { Routes } from '@angular/router';
import { App } from './app';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: App
  },
  {
    path: 'proyecto/:id',
    component: ProjectDetailComponent
  }
];
