import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  isMenuOpen = false;
  isSmallScreen = false;

  constructor(
    private authService: AuthService,
  ) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 767;
    if (this.isSmallScreen) {
      this.isMenuOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
