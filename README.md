# 🚀 Gestor Ágio Invest - Financial Leverage & Consortium Quota Management System

![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Mobile_Responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

Sistema de gerenciamento de cotas de consórcio imobiliário, planejamento financeiro e simulação de ágio com **Lance Embutido (Ademicon)**. Desenvolvido com **Engenharia de Software de Alta Performance**, 100% responsivo para smartphones/tablets, pronto para deploy na **Vercel** e integração com **Firebase Firestore**.

---

## 📱 Responsividade Mobile
- **Design Fluid Breakpoints:** Otimizado para telas de smartpones (320px - 480px), tablets (768px) e monitores 4K.
- **Layout Adaptável:** Banners de KPI, formulários e tabela de portfólio ajustam-se automaticamente para navegação por toque em celulares.

---

## 🌐 Como Deploiar na Vercel (1 Clique)

O projeto já inclui o arquivo de configuração [`vercel.json`](./vercel.json).

### Método A: Via GitHub (Recomendado)
1. Suba este repositório para o seu **GitHub**.
2. Acesse [vercel.com](https://vercel.com) e faça login.
3. Clique em **"Add New Project"** e selecione este repositório do GitHub.
4. Clique em **"Deploy"** (Não requer nenhum comando de build).

### Método B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🔥 Como Conectar ao Firebase Firestore (Opcional para Nuvem)

O projeto inclui o serviço [`FirebaseService.js`](./src/js/services/FirebaseService.js).

1. Crie um projeto gratuito no [Firebase Console](https://console.firebase.google.com/).
2. Ative o **Cloud Firestore** em modo de produção.
3. Copie suas credenciais de configuração e insira em `src/js/services/FirebaseService.js`.
4. Se o Firebase não estiver configurado, a aplicação opera automaticamente no modo **LocalStorage**, garantindo funcionamento offline!

---

## 📂 Estrutura do Repositório

```
plano para empresa de consorcio agio/
├── index.html                           # Entrypoint HTML5 semântico e responsivo
├── vercel.json                          # Configuração de implantação na Vercel
├── README.md                            # Documentação mestre do projeto
├── LICENSE                              # Licença MIT
├── docs/                                # Documentação estratégica e jurídica do plano (.md)
│   ├── 01_plano_estrategico_e_operacional.md
│   ├── 02_plano_financeiro_alavancagem_100k.md
│   ├── 03_requisitos_legais_e_contratos.md
│   └── 04_vendas_script_e_prospeccao.md
└── src/                                 # Código-fonte modular
    ├── css/                             # Módulos CSS e regras responsivas mobile
    │   └── main.css                     # Master Stylesheet com Media Queries (320px - 1440px)
    └── js/                              # Módulos JS (MVC Architecture)
        ├── config/constants.js          # Constantes e formatos BRL
        ├── models/CotaModel.js          # Domínio financeiro e regras de cálculo
        ├── services/
        │   ├── StorageService.js        # Persistência LocalStorage
        │   ├── DocumentService.js       # Leitor de documentos Markdown
        │   └── FirebaseService.js       # Integração com banco Firebase Firestore
        └── app.js                       # Controller principal da aplicação
```

---

## 📜 Licença

Este projeto está sob a licença [MIT](./LICENSE).
