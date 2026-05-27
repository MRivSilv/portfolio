import { Injectable, inject } from '@angular/core';
import { PortfolioContentService } from './portfolio-content.service';
import { type Project } from './portfolio-content.model';

@Injectable({ providedIn: 'root' })
export class ProjectDetailService {
  private readonly portfolioService = inject(PortfolioContentService);

  getProjectById(id: string): Project | undefined {
    return this.portfolioService.content().projects.find((p) => p.id === id);
  }

  getRelatedProjects(currentId: string, limit: number = 2): Project[] {
    return this.portfolioService
      .content()
      .projects.filter((p) => p.id !== currentId)
      .slice(0, limit);
  }
}
