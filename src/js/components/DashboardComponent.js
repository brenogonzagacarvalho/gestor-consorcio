/**
 * DashboardComponent - Renders Executive KPI Banner & Goal Progress Tracker
 */

import { GOAL_TARGET, GOAL_COTAS_TARGET, formatBRL } from '../config/constants.js';

export class DashboardComponent {
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
