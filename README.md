# 🔮 Calcolatore Astrologico PWA

Una Progressive Web App moderna per calcolare il segno zodiacale e l'ascendente di una persona, con particolare attenzione al segno del Sagittario.

## ✨ Caratteristiche

- 📱 **Progressive Web App** - Installabile su mobile e desktop
- 🌐 **Funziona offline** - Service Worker per cache intelligente
- 🎯 **Calcolo del segno zodiacale** - Basato sulla data di nascita
- 🌅 **Calcolo dell'ascendente** - Usando calcoli astronomici
- 📍 **Geocoding automatico** - Trova le coordinate dal nome della città
- 🎨 **Design moderno** - Interfaccia responsive e accattivante
- ♐ **Focus sul Sagittario** - Evidenziazione speciale per i nati sotto questo segno

## 🚀 Come usare

### Installazione locale

1. Scarica tutti i file nella stessa directory
2. Avvia un server locale (non aprire direttamente il file HTML):

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx http-server

# Con Live Server (VS Code extension)
```

3. Apri `http://localhost:8000` nel browser

### Utilizzo dell'app

1. **Data di nascita**: Inserisci la tua data di nascita
2. **Ora di nascita**: Inserisci l'ora più precisa possibile (importante per l'ascendente)
3. **Luogo di nascita**: Inserisci la città e paese
   - Le coordinate vengono calcolate automaticamente
   - Città italiane principali sono pre-configurate
   - Per altre città usa il geocoding automatico

4. Clicca **"🔥 Calcola"** per ottenere i risultati

## 📊 Informazioni tecniche

### Calcoli astrologici

- **Segno zodiacale**: Calcolato in base alla data di nascita e alle date tradizionali dei segni
- **Ascendente**: Calcolato usando:
  - Tempo siderale locale
  - Coordinate geografiche
  - Data e ora di nascita
  - Formule astronomiche semplificate

### Tecnologie utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Design moderno con gradients e animazioni
- **JavaScript ES6+** - Logica dell'applicazione
- **Service Worker** - Funzionalità offline
- **Web App Manifest** - Installabilità PWA
- **Nominatim API** - Geocoding delle città

### Funzionalità PWA

- ✅ Installabile come app nativa
- ✅ Funziona offline
- ✅ Responsive design
- ✅ Icons e splash screen
- ✅ Service Worker per caching
- ✅ Manifest per metadati

## 🌍 Geocoding

L'app supporta:

### Città pre-configurate (Italia)
- Roma, Milano, Napoli, Torino, Palermo
- Genova, Bologna, Firenze, Bari, Catania
- Venezia, Verona, Messina, Padova, Trieste

### Geocoding automatico
- Usa OpenStreetMap Nominatim
- Funziona per città in tutto il mondo
- Fallback intelligente per connessioni offline

## 🎨 Design

- **Colori**: Gradiente viola-blu con accenti dorati
- **Typography**: Font di sistema per prestazioni ottimali
- **Animazioni**: Transizioni fluide e loading states
- **Responsive**: Ottimizzato per mobile e desktop
- **Accessibilità**: Contrasti appropriati e navigazione keyboard

## ♐ Funzionalità speciali Sagittario

Quando il segno calcolato è Sagittario:
- 🎯 Card evidenziata con colori speciali
- ✨ Messaggio di congratulazioni
- 🔥 Animazioni e styling enhanced

## 🔧 Personalizzazione

### Aggiungere nuove città
Modifica l'oggetto `commonPlaces` in `app.js`:

```javascript
this.commonPlaces = {
    'TuaCittà': { lat: 40.1234, lng: 9.5678 },
    // ... altre città
};
```

### Modificare i calcoli
I calcoli astrologici sono in `astro-calculations.js`:
- `calculateZodiacSign()` - Logica del segno zodiacale
- `calculateAscendant()` - Logica dell'ascendente

### Personalizzare il design
Modifica le variabili CSS in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #f59e0b;
    /* ... altre variabili */
}
```

## 🐛 Risoluzione problemi

### L'app non si installa
- Verifica che sia servita tramite HTTPS o localhost
- Controlla che tutti i file del manifest siano accessibili

### Geocoding non funziona
- Verifica la connessione internet
- Prova con una città più conosciuta
- Inserisci manualmente le coordinate se necessario

### Calcoli inaccurati
- Verifica che l'ora di nascita sia corretta
- Controlla che le coordinate siano precise
- Per massima precisione, usa software astrologico professionale

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di:
- Migliorare i calcoli astrologici
- Aggiungere nuove funzionalità
- Migliorare il design
- Correggere bug

---

💫 *Creato con passione per l'astrologia e la tecnologia moderna*