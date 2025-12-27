import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  whatsappLink: string;

  constructor(private whatsappService: WhatsappService) {
    this.whatsappLink = this.whatsappService.getDirectLink();
  }
}
