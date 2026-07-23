/**
 * StorageService - LocalStorage Persistence Service Pattern
 */

import { STORAGE_KEY, PRINT_DEFAULTS } from '../config/constants.js';
import { CotaModel } from '../models/CotaModel.js';

export class StorageService {
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
}
