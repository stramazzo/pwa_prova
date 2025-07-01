# Boiler Calculator PWA

Una Progressive Web App (PWA) con cinque calcolatori specializzati per calcoli termici e matematici, basata sui file `boiler_calculator.py` e `calculator_config.ini`.

## 🧮 Calcolatori Disponibili

### 1. 🔥 Heating Time Calculator
Calcola il tempo necessario per riscaldare l'acqua da una temperatura iniziale a una temperatura target.
- **Parametri**: Temperatura iniziale/finale, volume acqua, potenza riscaldatore, temperatura ambiente, coefficiente trasferimento termico, area superficie, volume acciaio inox
- **Risultato**: Tempo di riscaldamento in secondi e minuti

### 2. ⚡ Power Calculator
Calcola la potenza necessaria per riscaldare l'acqua in un tempo specificato.
- **Parametri**: Temperatura iniziale/finale, volume acqua, tempo richiesto, temperatura ambiente, coefficiente trasferimento termico, area superficie, volume acciaio inox
- **Risultato**: Potenza richiesta in Watt

### 3. ❄️ Cooling Time Calculator
Calcola il tempo di raffreddamento dell'acqua da una temperatura iniziale a una finale.
- **Parametri**: Temperatura iniziale/finale, volume acqua, temperatura ambiente, coefficiente trasferimento termico, area superficie, volume acciaio inox
- **Risultato**: Tempo di raffreddamento in secondi e minuti

### 4. ☕ Brewing Loss Calculator
Calcola le perdite di temperatura durante la preparazione del caffè.
- **Parametri**: Temperatura iniziale, volume acqua, volume acciaio inox, potenza riscaldatore applicata, portata preparazione, durata preparazione, temperatura tubazioni
- **Risultato**: Perdita di temperatura in °C

### 5. 🔢 Simple Calculator
Calcolatrice standard per operazioni matematiche base.
- **Operazioni**: Addizione, sottrazione, moltiplicazione, divisione, modulo
- **Funzionalità**: Supporto tastiera, numeri decimali, cancellazione intelligente

## 🎯 Funzionalità Principali

- **Menu di selezione**: Interfaccia moderna per scegliere il calcolatore
- **Gestione parametri**: Reset, salvataggio e caricamento dei valori
- **Calcoli precisi**: Formule basate su principi fisici reali
- **Design responsive**: Ottimizzato per desktop, tablet e smartphone
- **PWA installabile**: Può essere installata come app nativa
- **Funzionamento offline**: Cache per utilizzo senza connessione

## 🛠️ Gestione Parametri

Ogni calcolatore include tre pulsanti di gestione:

### 🔄 Reset to Default
Ripristina i valori predefiniti dal file `calculator_config.ini`

### 💾 Save Parameters
Salva i parametri correnti nel localStorage del browser

### 📂 Load Parameters
Carica i parametri precedentemente salvati

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

- **Manifest**: Configurazione per installazione fullscreen
- **Service Worker**: Cache per funzionamento offline
- **Design responsive**: Adattamento automatico ai dispositivi
- **iOS ottimizzato**: Supporto per safe areas e modalità standalone

## 🧪 Formule di Calcolo

### Heating Time
```
Tempo = Energia_Necessaria / (Potenza_Riscaldatore - Perdite_Termiche)
```

### Power Required
```
Potenza = Energia_Necessaria / Tempo_Richiesto + Perdite_Termiche
```

### Cooling Time
```
Tempo = Capacità_Termica * ΔT / Tasso_Perdita_Termica
```

### Brewing Loss
```
Perdita = Energia_Perduta / Capacità_Termica_Totale
```

## 📊 Struttura del Progetto

```
pwa_prova/
├── index.html              # Boiler Calculator PWA principale
├── manifest.json           # Configurazione PWA
├── sw.js                  # Service Worker
├── boiler_calculator.py    # File di riferimento Python
├── calculator_config.ini   # Configurazione parametri default
└── README.md              # Documentazione
```

## 🎨 Design

- **Colori**: Gradiente blu-viola con tema scuro per i risultati
- **Layout**: Grid CSS per menu, Flexbox per calcolatori
- **Animazioni**: Hover effects e transizioni fluide
- **Tipografia**: Font moderni e leggibili

## 🌐 Supporto Browser

Funziona su tutti i browser moderni che supportano:
- Service Workers
- Web App Manifest
- CSS Grid e Flexbox
- JavaScript ES6+
- localStorage

## 📄 Licenza

MIT License - Libero utilizzo per scopi personali e commerciali! 
