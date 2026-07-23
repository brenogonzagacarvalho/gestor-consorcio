/**
 * FirebaseService - Cloud Database Integration (Firebase Realtime Database)
 * Project: gestor-consorcio
 * Database URL: https://gestor-consorcio-default-rtdb.firebaseio.com
 */

export const firebaseConfig = window.FIREBASE_CONFIG || {
    apiKey: "AIzaSyBfLZJT5gJGfowcHby98f9PlfbQGoLx7Ic",
    authDomain: "gestor-consorcio.firebaseapp.com",
    databaseURL: "https://gestor-consorcio-default-rtdb.firebaseio.com",
    projectId: "gestor-consorcio",
    storageBucket: "gestor-consorcio.firebasestorage.app",
    messagingSenderId: "104584721327",
    appId: "1:104584721327:web:db1e105d8a3c657b97f55a"
};

export class FirebaseService {
    static init() {
        try {
            if (typeof firebase === 'undefined') {
                console.warn('Firebase SDK script não disponível. Operando no Modo Gratuito Local.');
                return null;
            }

            if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
                console.warn('Credenciais do Firebase ausentes. Operando no Modo Gratuito Local.');
                return null;
            }

            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            this.db = firebase.database();
            console.log('⚡ Firebase Realtime Database Conectado: gestor-consorcio');
            return this.db;
        } catch (e) {
            console.warn('Firebase Inicialização offline. Usando modo Local (LocalStorage).');
            return null;
        }
    }

    // Cotas Cloud Actions
    static async saveCotaCloud(cotaData) {
        if (!this.db) return false;
        try {
            await this.db.ref('cotas/' + cotaData.id).set(cotaData);
            return true;
        } catch (e) {
            console.warn('Salvando cota localmente.');
            return false;
        }
    }

    static async deleteCotaCloud(cotaId) {
        if (!this.db) return false;
        try {
            await this.db.ref('cotas/' + cotaId).remove();
            return true;
        } catch (e) {
            console.warn('Excluindo cota localmente.');
            return false;
        }
    }

    static subscribeCotasCloud(callback) {
        if (!this.db) return null;
        try {
            const cotasRef = this.db.ref('cotas');
            cotasRef.on('value', snapshot => {
                const data = snapshot.val();
                const cotas = data ? Object.values(data) : [];
                callback(cotas);
            }, err => {
                console.warn('⚠️ Realtime Database offline ou permissão negada. Operando no Modo Local.');
            });
            return cotasRef;
        } catch (e) {
            console.warn('⚠️ Realtime Database offline. Usando armazenamento Local.');
            return null;
        }
    }

    // Metas Cloud Actions
    static async saveMetaCloud(metaData) {
        if (!this.db) return false;
        try {
            await this.db.ref('metas/' + metaData.id).set(metaData);
            return true;
        } catch (e) {
            console.warn('Salvando meta localmente.');
            return false;
        }
    }

    static async deleteMetaCloud(metaId) {
        if (!this.db) return false;
        try {
            await this.db.ref('metas/' + metaId).remove();
            return true;
        } catch (e) {
            console.warn('Excluindo meta localmente.');
            return false;
        }
    }

    static subscribeMetasCloud(callback) {
        if (!this.db) return null;
        try {
            const metasRef = this.db.ref('metas');
            metasRef.on('value', snapshot => {
                const data = snapshot.val();
                const metas = data ? Object.values(data) : [];
                callback(metas);
            }, err => {
                console.warn('⚠️ Realtime Database offline ou permissão negada. Operando no Modo Local.');
            });
            return metasRef;
        } catch (e) {
            console.warn('⚠️ Realtime Database offline. Usando armazenamento Local.');
            return null;
        }
    }
}
