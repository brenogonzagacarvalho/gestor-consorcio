/**
 * FirebaseService - Cloud Database Integration (Firebase Firestore)
 * Configured for project: gestor-consorcio
 */

export const firebaseConfig = {
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
            console.error('Firestore Write Error:', e);
            return false;
        }
    }

    static async deleteCotaCloud(cotaId) {
        if (!this.db) return false;
        try {
            await this.db.collection('cotas').doc(cotaId).delete();
            return true;
        } catch (e) {
            console.error('Firestore Delete Error:', e);
            return false;
        }
    }

    static async fetchCotasCloud() {
        if (!this.db) return null;
        try {
            const snapshot = await this.db.collection('cotas').get();
            if (snapshot.empty) return null;
            return snapshot.docs.map(doc => doc.data());
        } catch (e) {
            console.error('Firestore Read Error:', e);
            return null;
        }
    }
}
