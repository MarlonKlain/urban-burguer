import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container page-content">
      <h1>Termos de Uso</h1>
      <p>Última atualização: Dezembro de 2024</p>
      
      <section>
        <h2>1. Aceitação dos Termos</h2>
        <p>Ao acessar e utilizar a plataforma Urban Burger, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site/app.</p>
      </section>

      <section>
        <h2>2. Uso do Serviço</h2>
        <p>O Urban Burger é uma plataforma de delivery de alimentos. Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.</p>
        <p>É proibido:</p>
        <ul>
            <li>Fornecer informações falsas no cadastro.</li>
            <li>Usar o serviço para fins fraudulentos.</li>
            <li>Interferir na segurança ou funcionamento da plataforma.</li>
        </ul>
      </section>

      <section>
        <h2>3. Pedidos e Pagamentos</h2>
        <p>Os preços dos produtos estão exibidos na plataforma e podem sofrer alterações sem aviso prévio. O pagamento deve ser realizado pelos meios disponíveis no momento do checkout (cartão de crédito, débito, pix, etc).</p>
      </section>

      <section>
        <h2>4. Cancelamento e Reembolso</h2>
        <p>O cancelamento do pedido pode ser solicitado antes do início do preparo. Caso o pedido já esteja em preparo ou a caminho, poderá ser cobrada uma taxa. Problemas com a qualidade do produto devem ser reportados imediatamente após o recebimento.</p>
      </section>

      <section>
        <h2>5. Propriedade Intelectual</h2>
        <p>Todo o conteúdo deste site (textos, imagens, logos, software) é propriedade exclusiva do Urban Burger e está protegido por leis de direitos autorais.</p>
      </section>

       <section>
        <h2>6. Foro</h2>
        <p>Fica eleito o foro da comarca da cidade sede da empresa para dirimir quaisquer dúvidas oriundas destes Termos de Uso.</p>
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
    ul { margin-bottom: 1rem; padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; color: #666; line-height: 1.6; }
  `]
})
export class TermsComponent { }
