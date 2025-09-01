import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PricingTableComponent } from "./components/pricing-table/pricing-table.component";
import { HeaderComponent } from "./components/header/header.component";
import { SideNavBarComponent } from "./components/side-nav-bar/side-nav-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, SideNavBarComponent, RouterOutlet,CommonModule]
})
export class AppComponent {
  title = 'angular-theme-switcher';

   public isLightTheme = true;

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }
}
