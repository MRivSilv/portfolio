import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectDetailService } from '../../core/portfolio/project-detail.service';
import { type Project } from '../../core/portfolio/portfolio-content.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectDetailService = inject(ProjectDetailService);

  project: Project | undefined;
  relatedProjects: Project[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const projectId = params['id'];
      this.project = this.projectDetailService.getProjectById(projectId);
      this.relatedProjects = this.projectDetailService.getRelatedProjects(projectId);
    });
  }
}
