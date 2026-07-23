/**
 * FirebaseService - Cloud Database Integration (Firebase Firestore)
 * Project: gestor-consorcio
 */

export const firebaseConfig = window.FIREBASE_CONFIG || {
    apiKey: "AIzaSyBfLZJT5gJGfowcHby98f9PlfbQGoLx7Ic",
    authDomain: "gestor-consorcio.firebaseapp.com",
    projectId: "gestor-consorcio",
    storageBucket: "gestor-consorcio.firebasestorage.app",
    messagingSenderId: "104584721327",
    appId: "1:104584721327:web:db1e105d8a3c657b97f55a"
};

export class FirebaseService {
    static init() {
        try {
            if (typeof firebase === 'undefined') {
                console.warn('Firebase SDK script not available. Operating in LocalStorage Mode.');
                return null;
            }

            if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
                console.warn('Firebase credentials missing. Operating in LocalStorage Mode.');
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
