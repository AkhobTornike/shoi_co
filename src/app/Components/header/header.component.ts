import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderAddComponent } from "./header-add/header-add.component";
import { SearchComponent } from "./search/search.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderAddComponent, SearchComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isMobileView: boolean = false;
  isNavOpen: boolean = false;
  isSearchOpen: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      window.addEventListener('resize', () => this.checkScreenSize());
    }
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 947;
    }
  }

  openSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  openNav() {
    this.isNavOpen = !this.isNavOpen;
  }

}
