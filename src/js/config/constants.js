/**
 * Application Constants & Configuration
 * Gestor Ágio Invest - Ademicon Consórcios
 */

export const GOAL_TARGET = 100000; // Meta de R$ 100.000,00 de Lucro Líquido
export const GOAL_COTAS_TARGET = 9; // 9 cotas para superar R$ 100k
export const STORAGE_KEY = 'agio_invest_cotas_v3';

export const PRINT_DEFAULTS = [
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

export const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
};
