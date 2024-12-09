import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dress-style',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dress-style.component.html',
  styleUrl: './dress-style.component.scss'
})
export class DressStyleComponent {
  @Input() isMobileView!: boolean;
}
