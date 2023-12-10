import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorTextComponent } from '../../partials/error-text/error-text.component';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, ErrorTextComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {}
