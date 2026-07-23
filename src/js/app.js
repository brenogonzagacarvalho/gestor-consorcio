/**
 * Gestor Ágio Invest - Application Bootstrap & Controller
 * Firebase Firestore Cloud Sync & Full CRUD Enabled for Cotas & Metas
 * Project: gestor-consorcio
 */

(function () {
    // 1. CONSTANTS & CONFIG
    const GOAL_TARGET = 100000;
    const GOAL_COTAS_TARGET = 9;
    const STORAGE_KEY = 'agio_invest_cotas_v3';
    const METAS_STORAGE_KEY = 'agio_invest_metas_v1';

    const firebaseConfig = window.FIREBASE_CONFIG || {
        apiKey: "AIzaSyBfLZJT5gJGfowcHby98f9PlfbQGoLx7Ic",
        authDomain: "gestor-consorcio.firebaseapp.com",
        projectId: "gestor-consorcio",
        storageBucket: "gestor-consorcio.firebasestorage.app",
        messagingSenderId: "104584721327",
        appId: "1:104584721327:web:db1e105d8a3c657b97f55a"
    };

    const PRINT_DEFAULTS = [
        {
            id: 'cota-1624-263',
            grupo: '1624',
            cotaNum: '263',
            creditoBruto: 126170.12,
            lanceEmbutidoPct: 29.0003,
            lanceDinheiro: 21953.60,
            parcelaAdesao: 1463.58,
            parcelaAtual: 1370.65,
            prazoRestante: 64,
            lucroDesejado: 11500.00,
            status: 'Contemplada'
        },
        {
            id: 'cota-1625-112',
            grupo: '1625',
            cotaNum: '112',
            creditoBruto: 126170.12,
            lanceEmbutidoPct: 29.0003,
            lanceDinheiro: 21953.60,
            parcelaAdesao: 1463.58,
            parcelaAtual: 1370.65,
            prazoRestante: 64,
            lucroDesejado: 11500.00,
            status: 'Andamento'
        },
        {
            id: 'cota-1626-089',
            grupo: '1626',
            cotaNum: '089',
            creditoBruto: 126170.12,
            lanceEmbutidoPct: 29.0003,
            lanceDinheiro: 21953.60,
            parcelaAdesao: 1463.58,
            parcelaAtual: 1370.65,
            prazoRestante: 64,
            lucroDesejado: 11500.00,
            status: 'Andamento'
        }
    ];

    const DEFAULT_METAS = [
        { id: 'meta-1', nome: 'Entrada / Quitação do Carro Novo', valor: 35000, prazo: 'Outubro/2026' },
        { id: 'meta-2', nome: 'Viagem de Fim de Ano em Família', valor: 15000, prazo: 'Novembro/2026' },
        { id: 'meta-3', nome: 'Reserva de Emergência / Investimento', valor: 30000, prazo: 'Dezembro/2026' },
        { id: 'meta-4', nome: 'Presentes & Festas de Natal', valor: 5000, prazo: 'Dezembro/2026' }
    ];

    const formatBRL = (val) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
    };

    // 2. DOMAIN MODELS
    class CotaModel {
        constructor(data) {
            this.id = data.id || `cota-${Date.now()}`;
            this.grupo = data.grupo || '';
            this.cotaNum = data.cotaNum || '';
            this.creditoBruto = parseFloat(data.creditoBruto) || 0;
            this.lanceEmbutidoPct = parseFloat(data.lanceEmbutidoPct) || 0;
            this.lanceDinheiro = parseFloat(data.lanceDinheiro) || 0;
            this.parcelaAdesao = parseFloat(data.parcelaAdesao) || 0;
            this.parcelaAtual = parseFloat(data.parcelaAtual) || 0;
            this.prazoRestante = parseInt(data.prazoRestante) || 0;
            this.lucroDesejado = parseFloat(data.lucroDesejado) || 0;
            this.status = data.status || 'Andamento';
        }

        get valorEmbutido() {
            return this.creditoBruto * (this.lanceEmbutidoPct / 100);
        }

        get creditoLiquido() {
            return this.creditoBruto - this.valorEmbutido;
        }

        get investidoCaixa() {
            return this.lanceDinheiro + this.parcelaAdesao;
        }

        get valorVendaAgio() {
            return this.investidoCaixa + this.lucroDesejado;
        }

        toJSON() {
            return {
                id: this.id,
                grupo: this.grupo,
                cotaNum: this.cotaNum,
                creditoBruto: this.creditoBruto,
                lanceEmbutidoPct: this.lanceEmbutidoPct,
                lanceDinheiro: this.lanceDinheiro,
                parcelaAdesao: this.parcelaAdesao,
                parcelaAtual: this.parcelaAtual,
                prazoRestante: this.prazoRestante,
                lucroDesejado: this.lucroDesejado,
                status: this.status
            };
        }
    }

    class MetaModel {
        constructor(data) {
            this.id = data.id || `meta-${Date.now()}`;
            this.nome = data.nome || '';
            this.valor = parseFloat(data.valor) || 0;
            this.prazo = data.prazo || 'Dezembro/2026';
        }

        toJSON() {
            return {
                id: this.id,
                nome: this.nome,
                valor: this.valor,
                prazo: this.prazo
            };
        }
    }

    // 3. FIREBASE SERVICE (FULL REAL-TIME SNAPSHOT SYNC)
    class FirebaseService {
        static init() {
            try {
                if (typeof firebase === 'undefined') {
                    console.warn('Firebase SDK script not available. Operating in LocalStorage Mode.');
                    return null;
                }

                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
                this.db = firebase.firestore();
                console.log('🔥 Firebase Firestore Connected: gestor-consorcio');
                return this.db;
            } catch (e) {
                console.error('Firebase Initialization Error:', e);
                return null;
            }
        }

        // Cotas Cloud Actions
        static async saveCotaCloud(cotaData) {
            if (!this.db) return false;
            try {
                await this.db.collection('cotas').doc(cotaData.id).set(cotaData);
                return true;
            } catch (e) {
                console.error('Firestore Save Cota Error:', e);
                return false;
            }
        }

        static async deleteCotaCloud(cotaId) {
            if (!this.db) return false;
            try {
                await this.db.collection('cotas').doc(cotaId).delete();
                return true;
            } catch (e) {
                console.error('Firestore Delete Cota Error:', e);
                return false;
            }
        }

        static subscribeCotasCloud(callback) {
            if (!this.db) return null;
            return this.db.collection('cotas').onSnapshot(snapshot => {
                const cotas = snapshot.docs.map(doc => doc.data());
                callback(cotas);
            }, err => console.error('Firestore Cotas listener error:', err));
        }

        // Metas Cloud Actions
        static async saveMetaCloud(metaData) {
            if (!this.db) return false;
            try {
                await this.db.collection('metas').doc(metaData.id).set(metaData);
                return true;
            } catch (e) {
                console.error('Firestore Save Meta Error:', e);
                return false;
            }
        }

        static async deleteMetaCloud(metaId) {
            if (!this.db) return false;
            try {
                await this.db.collection('metas').doc(metaId).delete();
                return true;
            } catch (e) {
                console.error('Firestore Delete Meta Error:', e);
                return false;
            }
        }

        static subscribeMetasCloud(callback) {
            if (!this.db) return null;
            return this.db.collection('metas').onSnapshot(snapshot => {
                const metas = snapshot.docs.map(doc => doc.data());
                callback(metas);
            }, err => console.error('Firestore Metas listener error:', err));
        }
    }

    // 4. STORAGE SERVICE
    class StorageService {
        static loadCotas() {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                this.saveCotas(PRINT_DEFAULTS);
                return PRINT_DEFAULTS.map(item => new CotaModel(item));
            }

            try {
                const parsed = JSON.parse(raw);
                return parsed.map(item => new CotaModel(item));
            } catch (e) {
                console.error('Error loading cotas from LocalStorage:', e);
                return PRINT_DEFAULTS.map(item => new CotaModel(item));
            }
        }

        static saveCotas(cotas) {
            const payload = cotas.map(c => (c instanceof CotaModel ? c.toJSON() : c));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        }

        static loadMetas() {
            const raw = localStorage.getItem(METAS_STORAGE_KEY);
            if (!raw) {
                this.saveMetas(DEFAULT_METAS);
                return DEFAULT_METAS.map(item => new MetaModel(item));
            }

            try {
                const parsed = JSON.parse(raw);
                return parsed.map(item => new MetaModel(item));
            } catch (e) {
                console.error('Error loading metas from LocalStorage:', e);
                return DEFAULT_METAS.map(item => new MetaModel(item));
            }
        }

        static saveMetas(metas) {
            const payload = metas.map(m => (m instanceof MetaModel ? m.toJSON() : m));
            localStorage.setItem(METAS_STORAGE_KEY, JSON.stringify(payload));
        }
    }

    class DocumentService {
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

    // 5. UI COMPONENTS
    class DashboardComponent {
        constructor() {
            this.statLucroTotal = document.getElementById('stat-lucro-total');
            this.statCapitalInvestido = document.getElementById('stat-capital-investido');
            this.statCotasAtivas = document.getElementById('stat-cotas-ativas');
            this.statCotasVendidas = document.getElementById('stat-cotas-vendidas');
            this.statCotasMetaPct = document.getElementById('stat-cotas-meta-pct');
            this.goalPctDisplay = document.getElementById('goal-pct-display');
            this.goalBarFill = document.getElementById('goal-bar-fill');
            this.cotasTotalBadge = document.getElementById('cotas-total-badge');
        }

        render(cotas) {
            let totalLucroAcumulado = 0;
            let totalCapitalInvestido = 0;
            let cotasAtivasCount = 0;
            let cotasVendidasCount = 0;

            cotas.forEach((cota) => {
                if (cota.status === 'Vendida') {
                    totalLucroAcumulado += cota.lucroDesejado;
                    cotasVendidasCount++;
                } else {
                    cotasAtivasCount++;
                    totalCapitalInvestido += cota.investidoCaixa;
                }
            });

            const pctMeta = Math.min(100, (totalLucroAcumulado / GOAL_TARGET) * 100);

            if (this.statLucroTotal) this.statLucroTotal.textContent = formatBRL(totalLucroAcumulado);
            if (this.statCapitalInvestido) this.statCapitalInvestido.textContent = formatBRL(totalCapitalInvestido);
            if (this.statCotasAtivas) this.statCotasAtivas.textContent = cotasAtivasCount;
            if (this.statCotasVendidas) this.statCotasVendidas.textContent = `${cotasVendidasCount} / ${GOAL_COTAS_TARGET}`;
            if (this.statCotasMetaPct) this.statCotasMetaPct.textContent = `${pctMeta.toFixed(1)}% da meta atingida`;
            
            if (this.goalPctDisplay) this.goalPctDisplay.textContent = `${pctMeta.toFixed(1)}% Concluído`;
            if (this.goalBarFill) this.goalBarFill.style.width = `${pctMeta}%`;
            if (this.cotasTotalBadge) this.cotasTotalBadge.textContent = `${cotas.length} Cota(s) Cadastrada(s)`;
        }
    }

    class MetasComponent {
        constructor(onSaveMeta, onDeleteMeta) {
            this.onSaveMeta = onSaveMeta;
            this.onDeleteMeta = onDeleteMeta;

            this.metaForm = document.getElementById('meta-form');
            this.metaIdInput = document.getElementById('meta-id');
            this.metaNomeInput = document.getElementById('meta-nome');
            this.metaValorInput = document.getElementById('meta-valor');
            this.metaPrazoInput = document.getElementById('meta-prazo');
            this.btnSalvarMeta = document.getElementById('btn-salvar-meta');
            this.btnCancelarMeta = document.getElementById('btn-cancelar-meta');

            this.metasGrid = document.getElementById('metas-grid');
            this.metasCotasNecessarias = document.getElementById('metas-cotas-necessarias');
            this.metasTotalValor = document.getElementById('metas-total-valor');
            this.metasLucroRealizado = document.getElementById('metas-lucro-realizado');
            this.metasSaldoRestante = document.getElementById('metas-saldo-restante');

            this.initEvents();
        }

        initEvents() {
            if (this.metaForm) {
                this.metaForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const newMeta = new MetaModel({
                        id: this.metaIdInput.value || null,
                        nome: this.metaNomeInput.value,
                        valor: this.metaValorInput.value,
                        prazo: this.metaPrazoInput.value
                    });
                    this.onSaveMeta(newMeta);
                    this.resetForm();
                });
            }

            if (this.btnCancelarMeta) {
                this.btnCancelarMeta.addEventListener('click', () => this.resetForm());
            }
        }

        fillForm(meta) {
            this.metaIdInput.value = meta.id;
            this.metaNomeInput.value = meta.nome;
            this.metaValorInput.value = meta.valor;
            this.metaPrazoInput.value = meta.prazo;

            if (this.btnSalvarMeta) this.btnSalvarMeta.querySelector('span').textContent = 'Atualizar Meta';
            if (this.btnCancelarMeta) this.btnCancelarMeta.style.display = 'block';
        }

        resetForm() {
            this.metaIdInput.value = '';
            this.metaForm.reset();
            this.metaPrazoInput.value = 'Dezembro/2026';
            if (this.btnSalvarMeta) this.btnSalvarMeta.querySelector('span').textContent = '+ Adicionar Meta';
            if (this.btnCancelarMeta) this.btnCancelarMeta.style.display = 'none';
        }

        render(metas, cotas) {
            if (!this.metasGrid) return;
            this.metasGrid.innerHTML = '';

            let totalMetasValor = 0;
            metas.forEach((meta) => {
                totalMetasValor += meta.valor;

                const card = document.createElement('div');
                card.className = 'meta-item-card';
                card.innerHTML = `
                    <div class="meta-item-info">
                        <h4>${meta.nome}</h4>
                        <p>Prazo: ${meta.prazo}</p>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span class="meta-item-val">${formatBRL(meta.valor)}</span>
                        <button class="btn-tbl-action btn-edit-meta" style="margin-left: 8px; font-size: 10px;" data-id="${meta.id}">✎</button>
                        <button class="btn-del-meta" data-id="${meta.id}" title="Excluir Meta">✕</button>
                    </div>
                `;

                card.querySelector('.btn-edit-meta').addEventListener('click', () => {
                    this.fillForm(meta);
                });

                card.querySelector('.btn-del-meta').addEventListener('click', () => {
                    this.onDeleteMeta(meta.id);
                });

                this.metasGrid.appendChild(card);
            });

            // Calculate profit realized from sold cotas
            let lucroRealizado = 0;
            cotas.forEach(cota => {
                if (cota.status === 'Vendida') {
                    lucroRealizado += cota.lucroDesejado;
                }
            });

            const saldoRestante = Math.max(0, totalMetasValor - lucroRealizado);
            const lucroPorCota = 11500;
            const cotasNecessarias = totalMetasValor > 0 ? Math.ceil(totalMetasValor / lucroPorCota) : 0;

            if (this.metasCotasNecessarias) this.metasCotasNecessarias.textContent = `${cotasNecessarias} Cotas Necessárias`;
            if (this.metasTotalValor) this.metasTotalValor.textContent = formatBRL(totalMetasValor);
            if (this.metasLucroRealizado) this.metasLucroRealizado.textContent = formatBRL(lucroRealizado);
            if (this.metasSaldoRestante) this.metasSaldoRestante.textContent = formatBRL(saldoRestante);
        }
    }

    class FormComponent {
        constructor(onSaveCallback) {
            this.onSaveCallback = onSaveCallback;

            this.cotaForm = document.getElementById('cota-form');
            this.cotaIdInput = document.getElementById('cota-id');
            this.grupoInput = document.getElementById('grupo');
            this.cotaNumInput = document.getElementById('cota-num');
            this.creditoBrutoInput = document.getElementById('credito-bruto');
            this.lanceEmbutidoPctInput = document.getElementById('lance-embutido-pct');
            this.lanceDinheiroInput = document.getElementById('lance-dinheiro');
            this.parcelaAdesaoInput = document.getElementById('parcela-adesao');
            this.parcelaAtualInput = document.getElementById('parcela-atual');
            this.prazoRestanteInput = document.getElementById('prazo-restante');
            this.lucroDesejadoInput = document.getElementById('lucro-desejado');
            this.statusCotaSelect = document.getElementById('status-cota');

            this.btnSalvarCota = document.getElementById('btn-salvar-cota');
            this.btnCancelarEdicao = document.getElementById('btn-cancelar-edicao');

            this.initEvents();
        }

        initEvents() {
            if (this.cotaForm) {
                this.cotaForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = this.getFormData();
                    const cota = new CotaModel(formData);
                    this.onSaveCallback(cota);
                    this.resetForm();
                });

                const inputs = this.cotaForm.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.addEventListener('input', () => this.updatePreview());
                });
            }

            if (this.btnCancelarEdicao) {
                this.btnCancelarEdicao.addEventListener('click', () => this.resetForm());
            }

            this.updatePreview();
        }

        getFormData() {
            return {
                id: this.cotaIdInput.value || null,
                grupo: this.grupoInput.value,
                cotaNum: this.cotaNumInput.value,
                creditoBruto: this.creditoBrutoInput.value,
                lanceEmbutidoPct: this.lanceEmbutidoPctInput.value,
                lanceDinheiro: this.lanceDinheiroInput.value,
                parcelaAdesao: this.parcelaAdesaoInput.value,
                parcelaAtual: this.parcelaAtualInput.value,
                prazoRestante: this.prazoRestanteInput.value,
                lucroDesejado: this.lucroDesejadoInput.value,
                status: this.statusCotaSelect.value
            };
        }

        fillForm(cota) {
            this.cotaIdInput.value = cota.id;
            this.grupoInput.value = cota.grupo;
            this.cotaNumInput.value = cota.cotaNum;
            this.creditoBrutoInput.value = cota.creditoBruto;
            this.lanceEmbutidoPctInput.value = cota.lanceEmbutidoPct;
            this.lanceDinheiroInput.value = cota.lanceDinheiro;
            this.parcelaAdesaoInput.value = cota.parcelaAdesao;
            this.parcelaAtualInput.value = cota.parcelaAtual;
            this.prazoRestanteInput.value = cota.prazoRestante;
            this.lucroDesejadoInput.value = cota.lucroDesejado;
            this.statusCotaSelect.value = cota.status;

            document.getElementById('form-title').textContent = 'Editar Cota Selecionada';
            this.btnSalvarCota.querySelector('span').textContent = 'Atualizar Cota';
            this.btnCancelarEdicao.style.display = 'block';

            this.updatePreview();
        }

        resetForm() {
            this.cotaIdInput.value = '';
            document.getElementById('form-title').textContent = 'Cadastrar Nova Cota Ademicon';
            this.btnSalvarCota.querySelector('span').textContent = 'Salvar / Adicionar Cota';
            this.btnCancelarEdicao.style.display = 'none';

            this.cotaForm.reset();
            this.grupoInput.value = '1624';
            this.cotaNumInput.value = '263';
            this.creditoBrutoInput.value = '126170.12';
            this.lanceEmbutidoPctInput.value = '29.0003';
            this.lanceDinheiroInput.value = '21953.60';
            this.parcelaAdesaoInput.value = '1463.58';
            this.parcelaAtualInput.value = '1370.65';
            this.prazoRestanteInput.value = '64';
            this.lucroDesejadoInput.value = '11500';
            this.statusCotaSelect.value = 'Andamento';

            this.updatePreview();
        }

        updatePreview() {
            const formData = this.getFormData();
            const tempModel = new CotaModel(formData);

            const prevCreditoLiquido = document.getElementById('prev-credito-liquido');
            const prevValorVenda = document.getElementById('prev-valor-venda');

            if (prevCreditoLiquido) prevCreditoLiquido.textContent = formatBRL(tempModel.creditoLiquido);
            if (prevValorVenda) prevValorVenda.textContent = formatBRL(tempModel.valorVendaAgio);
        }
    }

    class TableComponent {
        constructor(onEdit, onSell, onDelete) {
            this.onEdit = onEdit;
            this.onSell = onSell;
            this.onDelete = onDelete;
            this.cotasTbody = document.getElementById('cotas-tbody');
        }

        render(cotas) {
            if (!this.cotasTbody) return;
            this.cotasTbody.innerHTML = '';

            cotas.forEach((cota) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div class="font-bold">Grupo ${cota.grupo}</div>
                        <div class="text-muted">Cota ${cota.cotaNum}</div>
                    </td>
                    <td class="font-bold text-emerald">${formatBRL(cota.creditoLiquido)}</td>
                    <td>${formatBRL(cota.investidoCaixa)}</td>
                    <td class="font-bold text-gold">${formatBRL(cota.valorVendaAgio)}</td>
                    <td class="font-bold text-emerald">${formatBRL(cota.lucroDesejado)}</td>
                    <td><span class="status-tag ${cota.status}">${cota.status}</span></td>
                    <td>
                        <div class="action-btns-row">
                            <button class="btn-tbl-action btn-edit" data-id="${cota.id}">Editar</button>
                            ${cota.status !== 'Vendida' ? `<button class="btn-tbl-action btn-sell" data-id="${cota.id}">Vender</button>` : ''}
                            <button class="btn-tbl-action delete btn-delete" data-id="${cota.id}">✕</button>
                        </div>
                    </td>
                `;

                // Action Event Listeners
                tr.querySelector('.btn-edit').addEventListener('click', () => this.onEdit(cota.id));
                if (tr.querySelector('.btn-sell')) {
                    tr.querySelector('.btn-sell').addEventListener('click', () => this.onSell(cota.id));
                }
                tr.querySelector('.btn-delete').addEventListener('click', () => this.onDelete(cota.id));

                this.cotasTbody.appendChild(tr);
            });
        }
    }

    class ModalComponent {
        constructor() {
            this.docModalOverlay = document.getElementById('doc-modal-overlay');
            this.btnCloseModal = document.getElementById('btn-close-modal');
            this.modalDocTitle = document.getElementById('modal-doc-title');
            this.modalDocBody = document.getElementById('modal-doc-body');
            this.modalDocFilelink = document.getElementById('modal-doc-filelink');
            this.btnDocLinks = document.querySelectorAll('.btn-doc-link');

            this.docsMeta = DocumentService.getDocumentsMeta();
            this.initEvents();
        }

        initEvents() {
            this.btnDocLinks.forEach(btn => {
                btn.addEventListener('click', () => {
                    const docId = btn.getAttribute('data-doc');
                    this.openDocument(docId);
                });
            });

            if (this.btnCloseModal) {
                this.btnCloseModal.addEventListener('click', () => this.close());
            }

            if (this.docModalOverlay) {
                this.docModalOverlay.addEventListener('click', (e) => {
                    if (e.target === this.docModalOverlay) this.close();
                });
            }
        }

        openDocument(docId) {
            const doc = this.docsMeta[docId];
            if (!doc) return;

            if (this.modalDocTitle) this.modalDocTitle.textContent = doc.title;
            if (this.modalDocBody) this.modalDocBody.innerHTML = doc.fullContent;
            if (this.modalDocFilelink) {
                this.modalDocFilelink.href = doc.filename;
            }

            if (this.docModalOverlay) this.docModalOverlay.style.display = 'flex';
        }

        close() {
            if (this.docModalOverlay) this.docModalOverlay.style.display = 'none';
        }
    }

    // 6. MAIN CONTROLLER WITH FIREBASE & METAS REAL-TIME CRUD
    class AppController {
        constructor() {
            this.cotas = StorageService.loadCotas();
            this.metas = StorageService.loadMetas();
            FirebaseService.init();

            this.dashboard = new DashboardComponent();
            this.metasComponent = new MetasComponent(
                this.handleSaveMeta.bind(this),
                this.handleDeleteMeta.bind(this)
            );
            this.form = new FormComponent(this.handleSaveCota.bind(this));
            this.table = new TableComponent(
                this.handleEditCota.bind(this),
                this.handleSellCota.bind(this),
                this.handleDeleteCota.bind(this)
            );
            this.modal = new ModalComponent();

            this.initCloudListeners();
            this.render();
        }

        initCloudListeners() {
            // Subscribe to Firebase Firestore real-time updates for Cotas
            FirebaseService.subscribeCotasCloud(cloudCotas => {
                if (cloudCotas && cloudCotas.length > 0) {
                    this.cotas = cloudCotas.map(item => new CotaModel(item));
                    this.render();
                } else if (this.cotas.length > 0) {
                    this.cotas.forEach(cota => FirebaseService.saveCotaCloud(cota.toJSON()));
                }
            });

            // Subscribe to Firebase Firestore real-time updates for Metas
            FirebaseService.subscribeMetasCloud(cloudMetas => {
                if (cloudMetas && cloudMetas.length > 0) {
                    this.metas = cloudMetas.map(item => new MetaModel(item));
                    this.render();
                } else if (this.metas.length > 0) {
                    this.metas.forEach(meta => FirebaseService.saveMetaCloud(meta.toJSON()));
                }
            });
        }

        render() {
            this.dashboard.render(this.cotas);
            this.metasComponent.render(this.metas, this.cotas);
            this.table.render(this.cotas);

            StorageService.saveCotas(this.cotas);
            StorageService.saveMetas(this.metas);
        }

        handleSaveMeta(metaModel) {
            const index = this.metas.findIndex(m => m.id === metaModel.id);
            if (index >= 0) {
                this.metas[index] = metaModel;
            } else {
                this.metas.push(metaModel);
            }
            FirebaseService.saveMetaCloud(metaModel.toJSON());
            this.render();
        }

        handleDeleteMeta(metaId) {
            if (confirm('Tem certeza que deseja excluir esta meta de compras?')) {
                this.metas = this.metas.filter(m => m.id !== metaId);
                FirebaseService.deleteMetaCloud(metaId);
                this.render();
            }
        }

        handleSaveCota(cotaModel) {
            const index = this.cotas.findIndex(c => c.id === cotaModel.id);
            if (index >= 0) {
                this.cotas[index] = cotaModel;
            } else {
                this.cotas.push(cotaModel);
            }
            FirebaseService.saveCotaCloud(cotaModel.toJSON());
            this.render();
        }

        handleEditCota(id) {
            const cota = this.cotas.find(c => c.id === id);
            if (cota) {
                this.form.fillForm(cota);
            }
        }

        handleSellCota(id) {
            const cota = this.cotas.find(c => c.id === id);
            if (cota) {
                cota.status = 'Vendida';
                FirebaseService.saveCotaCloud(cota.toJSON());
                this.render();
            }
        }

        handleDeleteCota(id) {
            if (confirm('Tem certeza que deseja excluir esta cota do gerenciador?')) {
                this.cotas = this.cotas.filter(c => c.id !== id);
                FirebaseService.deleteCotaCloud(id);
                this.render();
            }
        }
    }

    // Bootstrap App
    document.addEventListener('DOMContentLoaded', () => {
        window.appController = new AppController();
    });
})();
