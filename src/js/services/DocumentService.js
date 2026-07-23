/**
 * DocumentService - Service managing Markdown plan document contents & modal rendering
 */

export class DocumentService {
    static getDocumentsMeta() {
        return {
            '01': {
                title: '01 - Plano Estratégico e Operacional: Operação Direta Ademicon (100% Orgânica)',
                filename: 'docs/01_plano_estrategico_e_operacional.md',
                fullContent: `
                    <h1>01 - Plano Estratégico e Operacional: Operação Direta Ademicon (100% Orgânica)</h1>
                    <p><strong>Foco:</strong> Venda e Gestão Direta de Cotas Ademicon | <strong>Estratégia de Aquisição:</strong> Prospecção Orgânica, Networking & Parcerias B2B | <strong>Praça:</strong> Fortaleza/CE</p>
                    <hr>
                    <h2>1. Visão Geral do Modelo de Operação Direta Orgânica</h2>
                    <p>Neste modelo, <strong>100% do seu capital inicial (R$ 500,00 a R$ 2.000,00) é investido no ativo principal: a cota de consórcio Ademicon</strong>. Não há investimento em tráfego pago ou anúncios.</p>
                    <h3>Como Funciona a Captação 100% Orgânica:</h3>
                    <ol>
                        <li><strong>Adesão da Cota Direta:</strong> Você faz a adesão de uma cota de consórcio imobiliário diretamente com a Ademicon, aplicando 100% do seu dinheiro inicial na parcela de entrada/ativação da cota.</li>
                        <li><strong>Estratégia de Lance Embutido:</strong> Utilização do <strong>Lance Embutido da Ademicon (20% a 30%)</strong> para buscar a contemplação sem necessidade de aporte em dinheiro.</li>
                        <li><strong>Prospecção Relacional & Parcerias em Fortaleza:</strong> A divulgação e venda da cota contemplada são feitas exclusivamente através de rede de contatos, parcerias com corretores de imóveis, construtores, arquitetos, grupos de empresários locais (ex: BNI, associações) e indicações diretas.</li>
                    </ol>
                    <hr>
                    <h2>2. Pilares da Prospecção 100% Orgânica em Fortaleza/CE</h2>
                    <ol>
                        <li><strong>Parcerias com Corretores e Imobiliárias:</strong> Corretores na Aldeota, Meireles, Cocó e Eusébio frequentemente atendem clientes que querem comprar imóveis à vista ou não conseguem aprovação de financiamento bancário. Você oferece uma comissão de indicação ao corretor ao fechar a venda do crédito Ademicon.</li>
                        <li><strong>Construtores e Arquitetos:</strong> Profissionais que projetam ou constroem casas no Eusébio, Aquiraz e Fortaleza precisam de clientes com crédito imobiliário liberado para iniciar obras.</li>
                        <li><strong>Grupos de Empresários e Networking Local:</strong> Participação em grupos de negócios locais (BNI, CDL Fortaleza, grupos de investidores) apresentando a <strong>Estratégia de Aquisição Imobiliária sem Juros</strong>.</li>
                        <li><strong>Indicações Premiadas (Member-Get-Member):</strong> Oferecer bônus em dinheiro (ex: R$ 500,00 a R$ 1.000,00) para qualquer cliente ou amigo que indicar um comprador que feche a cota.</li>
                    </ol>
                    <hr>
                    <h2>3. Plano de Ação: Como Garantir um "Salário" Recorrente de R$ 5.000,00 / Mês</h2>
                    <p>Como cada cota vendida gera <strong>R$ 11.500,00 de Lucro Líquido Real</strong>, para ter uma renda/pró-labore médio de <strong>R$ 5.000,00 por mês</strong>, você precisa vender apenas <strong>1 COTA A CADA 2 MESES</strong> (ou 0,5 cota/mês)!</p>
                    <blockquote><strong>Rendimento Médio Mensal com 1 cota/mês = R$ 11.500,00 / mês (Supera a meta em 130%!)</strong></blockquote>
                `
            },
            '02': {
                title: '02 - Plano Financeiro e Alavancagem: Cartas de R$ 120 Mil (Lucro de R$ 12k por Cota)',
                filename: 'docs/02_plano_financeiro_alavancagem_100k.md',
                fullContent: `
                    <h1>02 - Plano Financeiro e Alavancagem: Cartas de R$ 120 Mil (Lucro de R$ 12k por Cota)</h1>
                    <p><strong>Aporte Inicial:</strong> R$ 500 a R$ 2.000 | <strong>Praça:</strong> Fortaleza/CE | <strong>Parceira:</strong> Ademicon</p>
                    <hr>
                    <h2>1. Estrutura Financeira de uma Cota de R$ 120.000,00 na Ademicon</h2>
                    <ul>
                        <li><strong>Crédito Bruto Contratado:</strong> R$ 120.000,00</li>
                        <li><strong>Parcela Mensal Média:</strong> R$ 650,00 a R$ 750,00 / mês</li>
                        <li><strong>Lance Embutido Permitido Ademicon (30%):</strong> R$ 36.000,00</li>
                        <li><strong>Crédito Líquido Disponível para o Comprador:</strong> R$ 84.000,00</li>
                    </ul>
                    <hr>
                    <h2>2. Quantas Cotas São Necessárias para Atingir R$ 100.000?</h2>
                    <p>Com o lucro real de <strong>R$ 11.500,00 por cota de R$ 126k/89.5k</strong>:</p>
                    <blockquote><strong>R$ 100.000,00 ÷ R$ 11.500,00 = 8,69 cotas</strong>. Você precisa vender exatamente <strong>9 COTAS</strong> para ultrapassar os R$ 100.000 (9 x R$ 11.500 = R$ 103.500,00)!</blockquote>
                `
            },
            '03': {
                title: '03 - Requisitos Legais e Contratos: Operação Direta Ademicon',
                filename: 'docs/03_requisitos_legais_e_contratos.md',
                fullContent: `
                    <h1>03 - Requisitos Legais e Contratos: Operação Direta Ademicon</h1>
                    <p><strong>Modelo:</strong> Parceria / Venda Direta Ademicon | <strong>Foro:</strong> Fortaleza/CE</p>
                    <hr>
                    <h2>1. Estrutura Jurídica e Isenção CRECI/SUSEP</h2>
                    <p>A negociação de cotas contempladas é uma <strong>Cessão de Direitos de Crédito Financeiro</strong> (Arts. 286-298 do Código Civil). Não exige CRECI nem SUSEP. Operação regulada pelo Banco Central (Lei 11.795/2008).</p>
                `
            },
            '04': {
                title: '04 - Scripts de Venda Orgânica, Networking e Parcerias',
                filename: 'docs/04_vendas_script_e_prospeccao.md',
                fullContent: `
                    <h1>04 - Scripts de Venda Orgânica, Networking e Parcerias</h1>
                    <p><strong>Estratégia:</strong> 100% Orgânica | <strong>Praça:</strong> Fortaleza/CE | <strong>Parceira:</strong> Ademicon</p>
                    <hr>
                    <h2>1. Script de Abordagem para Corretores e Imobiliárias</h2>
                    <blockquote><strong>Você:</strong> "Olá [Nome do Corretor], tudo bem? Me chamo [Seu Nome], atuo como especialista em planejamento de crédito imobiliário na Ademicon Consórcios aqui em Fortaleza. Entregamos Crédito Imobiliário Estruturado via Lance Embutido com parcelas até 50% menores. Vamos fechar parceria e dividir a comissão?"</blockquote>
                `
            }
        };
    }
}
