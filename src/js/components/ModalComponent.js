/**
 * ModalComponent - Controls Markdown Document Reader Modal Overlay
 */

import { DocumentService } from '../services/DocumentService.js';

export class ModalComponent {
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
