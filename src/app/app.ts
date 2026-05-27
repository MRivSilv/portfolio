import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PortfolioContentService } from './core/portfolio/portfolio-content.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly portfolioContentService = inject(PortfolioContentService);

  protected readonly content = this.portfolioContentService.content;

  constructor() {
    this.portfolioContentService.init();
  }
}
