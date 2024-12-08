import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-add.component.html',
  styleUrl: './header-add.component.scss'
})
export class HeaderAddComponent {
  @Input() isMobileView!: boolean;

}
