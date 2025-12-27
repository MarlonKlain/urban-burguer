import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page-content">
      <h1>Sobre Nós</h1>
      
      <section>
        <h2>Nossa História</h2>
        <p>O Urban Burger nasceu com uma missão simples: servir o melhor hambúrguer da cidade usando apenas ingredientes frescos e selecionados.</p>
      </section>

      <section>
        <h2>Qualidade Premium</h2>
        <p>Acreditamos em qualidade sem compromisso. Nossa carne é artesanal, nossos pães são assados diariamente e nossos molhos são caseiros, tudo preparado com o máximo cuidado.</p>
      </section>

      <section>
        <h2>Visite-nos</h2>
        <p>Estamos localizados na Rua das Flores, 123. Venha nos visitar ou peça pelo app e receba o verdadeiro sabor urbano na sua casa!</p>
      </section>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 4rem 1rem;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { margin-bottom: 2rem; color: var(--text-color); }
    section { margin-bottom: 2rem; }
    h2 { margin-bottom: 1rem; color: var(--primary-color); }
    p { line-height: 1.6; color: #666; margin-bottom: 1rem; }
  `]
})
export class AboutComponent { }
