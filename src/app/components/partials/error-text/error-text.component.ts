import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'error-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-text.component.html',
  styleUrls: ['./error-text.component.css'],
})
export class ErrorTextComponent {
  @Input() errorText!: string;
  @Input() class!: string;
}
