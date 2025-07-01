# Calcolatrice PWA

Una calcolatrice moderna e funzionale sviluppata come Progressive Web App (PWA) con design responsive e funzionalità offline.

## 🧮 Funzionalità

- **Calcoli completi**: Addizione, sottrazione, moltiplicazione, divisione e modulo
- **Design moderno**: Interfaccia elegante con animazioni fluide
- **Responsive**: Ottimizzata per desktop, tablet e smartphone
- **Tastiera supportata**: Utilizzabile con la tastiera del computer
- **PWA installabile**: Può essere installata come app nativa
- **Offline**: Funziona senza connessione internet
- **Formattazione numeri**: Visualizzazione con separatori delle migliaia

## 🎯 Operazioni Supportate

- **Operazioni base**: +, -, ×, ÷
- **Modulo**: % (resto della divisione)
- **Decimali**: Supporto per numeri decimali
- **Cancellazione**: AC (All Clear) e DEL (Delete)
- **Prevenzione errori**: Controllo divisione per zero

## ⌨️ Controlli da Tastiera

- **Numeri**: 0-9
- **Operatori**: +, -, *, /, %
- **Enter/Spazio**: Calcola il risultato
- **Backspace**: Cancella ultimo carattere
- **Escape**: Cancella tutto
- **Punto**: Aggiunge decimale

## 🚀 Installazione

### Sviluppo Locale

1. Clona il repository:
   ```bash
   git clone https://github.com/stramazzo/pwa_prova.git
   cd pwa_prova
   ```

2. Apri `index.html` nel browser o avvia un server locale:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   ```

3. Visita `http://localhost:8000`

### Installazione come App

- **Desktop**: Cerca il pulsante di installazione nella barra degli indirizzi
- **Mobile**: Usa "Aggiungi alla schermata Home" dal menu del browser

## 📱 Caratteristiche PWA

- **Manifest**: Configurazione per installazione
- **Service Worker**: Cache per funzionamento offline
- **Design responsive**: Adattamento automatico ai dispositivi
- **Tema scuro**: Interfaccia moderna con colori eleganti

## 🛠️ Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: Grid, Flexbox, animazioni e design responsive
- **JavaScript ES6+**: Classe Calculator, event listeners
- **PWA APIs**: Service Worker, Web App Manifest

## 📊 Struttura del Progetto

```
pwa_prova/
├── index.html          # Calcolatrice PWA principale
├── manifest.json       # Configurazione PWA (da creare)
├── sw.js              # Service Worker (da creare)
├── favicon.ico        # Icona app (da creare)
└── README.md          # Documentazione
```

## 🎨 Design

- **Colori**: Gradiente blu-viola con tema scuro per il display
- **Layout**: Grid CSS per i pulsanti, Flexbox per il display
- **Animazioni**: Hover effects e transizioni fluide
- **Tipografia**: Font moderni e leggibili

## 🌐 Supporto Browser

Funziona su tutti i browser moderni che supportano:
- Service Workers
- Web App Manifest
- CSS Grid e Flexbox
- JavaScript ES6+

## 📄 Licenza

MIT License - Libero utilizzo per scopi personali e commerciali! 
