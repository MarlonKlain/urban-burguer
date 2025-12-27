import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-privacy',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container page-content">
      <h1>Política de Privacidade</h1>
      <p>Última atualização: Dezembro de 2024</p>
      
      <section>
        <h2>1. Introdução</h2>
        <p>A Urban Burger valoriza a sua privacidade e está comprometida em proteger os seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
      </section>

      <section>
        <h2>2. Dados que Coletamos</h2>
        <p>Para fornecer nossos serviços de delivery, coletamos os seguintes dados:</p>
        <ul>
          <li><strong>Dados Pessoais:</strong> Nome completo, CPF, e-mail e número de telefone.</li>
          <li><strong>Dados de Endereço:</strong> Endereço completo para entrega.</li>
          <li><strong>Dados Financeiros:</strong> Informações de pagamento (processadas de forma segura por gateways parceiros).</li>
          <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de dispositivo e navegador.</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalidade do Tratamento</h2>
        <p>Utilizamos seus dados para:</p>
        <ul>
          <li>Processar e entregar seus pedidos.</li>
          <li>Comunicar sobre o status do pedido.</li>
          <li>Emitir notas fiscais.</li>
          <li>Melhorar nossa plataforma e atendimento.</li>
          <li>Enviar ofertas e promoções (com seu consentimento prévio).</li>
        </ul>
      </section>

      <section>
        <h2>4. Seus Direitos (LGPD)</h2>
        <p>Como titular dos dados, você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento de dados.</li>
          <li>Acessar seus dados.</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
          <li>Revogar seu consentimento a qualquer momento.</li>
        </ul>
      </section>

      <section>
        <h2>5. Compartilhamento de Dados</h2>
        <p>Não vendemos seus dados. Compartilhamos apenas o necessário com:</p>
        <ul>
          <li>Entregadores parceiros (para realizar a entrega).</li>
          <li>Processadores de pagamento (para efetuar a cobrança).</li>
          <li>Autoridades judiciais, se requisitado por lei.</li>
        </ul>
      </section>

      <section>
        <h2>6. Contato com o Encarregado (DPO)</h2>
        <p>Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato com nosso Encarregado de Proteção de Dados:</p>
        <p><strong>E-mail:</strong> privacidade&#64;urbanburger.com.br</p>
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
export class PrivacyComponent { }
