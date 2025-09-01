import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK = 'dark-theme';
  private readonly LIGHT = 'light-theme';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  initTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const theme = savedTheme === this.DARK ? this.DARK : this.LIGHT;
    this.setTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;
    this.setTheme(newTheme);
  }

  // New method to check if current theme is dark
  isDarkMode(): boolean {
    return this.getCurrentTheme() === this.DARK;
  }

  private getCurrentTheme(): string {
    return this.document.body.classList.contains(this.DARK) ? this.DARK : this.LIGHT;
  }

  private setTheme(theme: string): void {
    this.document.body.classList.remove(this.DARK, this.LIGHT);
    this.document.body.classList.add(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }
}