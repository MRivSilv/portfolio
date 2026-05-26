import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PortfolioContentService } from './core/portfolio/portfolio-content.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly portfolioContentService = inject(PortfolioContentService);

  protected readonly content = this.portfolioContentService.content;
  protected readonly firebaseReady = this.portfolioContentService.firebaseReady;
  protected readonly loading = this.portfolioContentService.loading;
  protected readonly error = this.portfolioContentService.error;

  constructor() {
    void this.portfolioContentService.init();
  }
}
