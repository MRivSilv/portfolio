import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioContentService } from '../../core/portfolio/portfolio-content.service';

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
}
