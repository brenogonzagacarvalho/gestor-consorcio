/**
 * CotaModel - Represents Consortium Cota Domain Logic & Financial Calculations
 */

export class CotaModel {
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
