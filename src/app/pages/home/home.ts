import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioContentService } from '../../core/portfolio/portfolio-content.service';
import { type Skill } from '../../core/portfolio/portfolio-content.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  private readonly portfolioContentService = inject(PortfolioContentService);
  protected readonly content = this.portfolioContentService.content;
  protected readonly showCopyToast = signal(false);

  getTechStack(): Skill[] {
    const techNames = ['React Native', 'Go', 'FastAPI', 'Python', 'Machine Learning'];
    return this.content().skills.filter(skill => techNames.includes(skill.name));
  }

  async copyEmail(): Promise<void> {
    const email = this.content().profile.email;
    try {
      await navigator.clipboard.writeText(email);
      this.showCopyToast.set(true);
      setTimeout(() => this.showCopyToast.set(false), 3000);
    } catch (err) {
      console.error('Error al copiar email:', err);
    }
  }
}
