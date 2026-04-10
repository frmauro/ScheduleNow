import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-booking.component.html'
})
export class PublicBookingComponent {
  days = [
    { week: 'Seg', day: 16 },
    { week: 'Ter', day: 17 },
    { week: 'Qua', day: 18 },
    { week: 'Qui', day: 19 },
    { week: 'Sex', day: 20 },
    { week: 'Sáb', day: 21 },
  ];
}
