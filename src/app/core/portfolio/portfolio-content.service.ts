import { Injectable, signal } from '@angular/core';
import { DEFAULT_PORTFOLIO_CONTENT, type PortfolioContent } from './portfolio-content.model';

@Injectable({ providedIn: 'root' })
export class PortfolioContentService {
  readonly content = signal<PortfolioContent>(DEFAULT_PORTFOLIO_CONTENT);

  init(): void {
    this.content.set(DEFAULT_PORTFOLIO_CONTENT);
  }
}
