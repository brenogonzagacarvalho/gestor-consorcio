/**
 * FormComponent - Manages Form Controller for Cota Registration & Editing
 */

import { formatBRL } from '../config/constants.js';
import { CotaModel } from '../models/CotaModel.js';

export class FormComponent {
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
