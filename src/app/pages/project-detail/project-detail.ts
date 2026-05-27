import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioContentService } from '../../core/portfolio/portfolio-content.service';
import { Project } from '../../core/portfolio/portfolio-content.model';
import { ProjectModalComponent } from './project-modal/project-modal';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, ProjectModalComponent],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
  standalone: true
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly portfolioService = inject(PortfolioContentService);

  selectedProject = signal<Project | null>(null);
  allProjects = signal<Project[]>([]);

  constructor() {
    this.loadProjects();
    this.loadProjectFromUrl();
  }

  private loadProjects(): void {
    const content = this.portfolioService.content();
    this.allProjects.set(content.projects);
  }

  private loadProjectFromUrl(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      const content = this.portfolioService.content();
      const project = content.projects.find(p => p.id === projectId);
      this.selectedProject.set(project || null);
    });
  }

  closeModal(): void {
    this.router.navigate(['/']);
  }

  selectProject(project: Project): void {
    this.selectedProject.set(project);
    this.router.navigate(['/proyecto', project.id]);
  }
}
