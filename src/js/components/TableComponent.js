/**
 * TableComponent - Renders Portfolio Cotas Table with Inline Action Dispatchers
 */

import { formatBRL } from '../config/constants.js';

export class TableComponent {
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
