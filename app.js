// Applicazione principale per il calcolatore astrologico

class AstrologyApp {
    constructor() {
        this.form = document.getElementById('astroForm');
        this.results = document.getElementById('results');
        this.loading = document.getElementById('loading');
        this.birthPlaceInput = document.getElementById('birthPlace');
        this.latitudeInput = document.getElementById('latitude');
        this.longitudeInput = document.getElementById('longitude');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.birthPlaceInput.addEventListener('input', this.handlePlaceInput.bind(this));
        
        // Registra il service worker per PWA
        this.registerServiceWorker();
        
        // Precompila alcuni luoghi comuni per demo
        this.setupPlaceAutocomplete();
    }
    
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('./sw.js');
                console.log('Service Worker registrato con successo');
            } catch (error) {
                console.log('Errore nella registrazione del Service Worker:', error);
            }
        }
    }
    
    setupPlaceAutocomplete() {
        // Lista di città comuni italiane con coordinate pre-calcolate
        this.commonPlaces = {
            'Roma': { lat: 41.9028, lng: 12.4964 },
            'Milano': { lat: 45.4642, lng: 9.1900 },
            'Napoli': { lat: 40.8518, lng: 14.2681 },
            'Torino': { lat: 45.0703, lng: 7.6869 },
            'Palermo': { lat: 38.1157, lng: 13.3615 },
            'Genova': { lat: 44.4056, lng: 8.9463 },
            'Bologna': { lat: 44.4949, lng: 11.3426 },
            'Firenze': { lat: 43.7696, lng: 11.2558 },
            'Bari': { lat: 41.1171, lng: 16.8719 },
            'Catania': { lat: 37.5079, lng: 15.0830 },
            'Venezia': { lat: 45.4408, lng: 12.3155 },
            'Verona': { lat: 45.4384, lng: 10.9916 },
            'Messina': { lat: 38.1938, lng: 15.5540 },
            'Padova': { lat: 45.4064, lng: 11.8768 },
            'Trieste': { lat: 45.6495, lng: 13.7768 }
        };
    }
    
    handlePlaceInput(event) {
        const place = event.target.value.trim();
        
        // Cerca prima nei luoghi comuni
        const exactMatch = this.commonPlaces[place];
        if (exactMatch) {
            this.latitudeInput.value = exactMatch.lat;
            this.longitudeInput.value = exactMatch.lng;
            return;
        }
        
        // Cerca parzialmente nei luoghi comuni
        const partialMatch = Object.keys(this.commonPlaces).find(key => 
            key.toLowerCase().includes(place.toLowerCase()) && place.length > 2
        );
        
        if (partialMatch) {
            const coords = this.commonPlaces[partialMatch];
            this.latitudeInput.value = coords.lat;
            this.longitudeInput.value = coords.lng;
            return;
        }
        
        // Se non trovato nei luoghi comuni e il campo ha abbastanza caratteri, prova geocoding
        if (place.length > 3) {
            this.debounceGeocoding(place);
        }
    }
    
    debounceGeocoding(place) {
        clearTimeout(this.geocodingTimeout);
        this.geocodingTimeout = setTimeout(() => {
            this.geocodePlace(place);
        }, 1000);
    }
    
    async geocodePlace(place) {
        try {
            // Usa un servizio di geocoding gratuito (Nominatim di OpenStreetMap)
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}&limit=1`);
            const data = await response.json();
            
            if (data && data.length > 0) {
                const location = data[0];
                this.latitudeInput.value = parseFloat(location.lat).toFixed(4);
                this.longitudeInput.value = parseFloat(location.lon).toFixed(4);
            }
        } catch (error) {
            console.error('Errore nel geocoding:', error);
            // Non mostra errore all'utente per non interrompere l'esperienza
        }
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const birthData = {
            birthDate: formData.get('birthDate'),
            birthTime: formData.get('birthTime'),
            birthPlace: formData.get('birthPlace'),
            latitude: formData.get('latitude'),
            longitude: formData.get('longitude')
        };
        
        // Validazione
        if (!this.validateForm(birthData)) {
            return;
        }
        
        this.showLoading(true);
        
        try {
            // Piccolo delay per mostrare l'animazione di caricamento
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const results = calculateAstrology(birthData);
            this.displayResults(results);
            
        } catch (error) {
            console.error('Errore nel calcolo:', error);
            this.showError('Si è verificato un errore durante il calcolo. Riprova.');
        } finally {
            this.showLoading(false);
        }
    }
    
    validateForm(data) {
        if (!data.birthDate) {
            this.showError('Inserisci la data di nascita');
            return false;
        }
        
        if (!data.birthTime) {
            this.showError('Inserisci l\'ora di nascita');
            return false;
        }
        
        if (!data.birthPlace) {
            this.showError('Inserisci il luogo di nascita');
            return false;
        }
        
        if (!data.latitude || !data.longitude) {
            this.showError('Non riesco a trovare le coordinate del luogo. Prova con una città più conosciuta o inserisci manualmente le coordinate.');
            return false;
        }
        
        return true;
    }
    
    showLoading(show) {
        this.loading.classList.toggle('hidden', !show);
        this.form.style.pointerEvents = show ? 'none' : 'auto';
    }
    
    showError(message) {
        // Crea un toast di errore
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
    
    displayResults(results) {
        const { zodiacSign, ascendant, isSagittarius } = results;
        
        // Mostra i risultati del segno zodiacale
        document.getElementById('zodiacSign').innerHTML = `
            <span style="font-size: 2rem;">${zodiacSign.symbol}</span>
            <strong>${zodiacSign.sign}</strong>
            <small>${zodiacSign.dates}</small>
        `;
        document.getElementById('zodiacDescription').textContent = zodiacSign.description;
        
        // Mostra i risultati dell'ascendente
        let ascendantHTML = `
            <span style="font-size: 2rem;">${ascendant.symbol}</span>
            <strong>${ascendant.sign}</strong>
        `;
        
        if (ascendant.degree !== undefined) {
            ascendantHTML += `<small>${ascendant.degree}°</small>`;
        }
        
        document.getElementById('ascendant').innerHTML = ascendantHTML;
        document.getElementById('ascendantDescription').textContent = ascendant.description;
        
        // Se c'è un warning per l'ascendente, mostralo
        if (ascendant.warning) {
            const warningDiv = document.createElement('div');
            warningDiv.style.cssText = `
                background: #fef3c7;
                border: 1px solid #f59e0b;
                padding: 0.5rem;
                border-radius: 6px;
                margin-top: 0.5rem;
                font-size: 0.8rem;
                color: #92400e;
            `;
            warningDiv.textContent = `⚠️ ${ascendant.warning}`;
            document.getElementById('ascendantDescription').appendChild(warningDiv);
        }
        
        // Evidenzia se la persona è del Sagittario
        if (isSagittarius) {
            const sagittariusCard = document.querySelector('.result-card:first-child');
            sagittariusCard.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
            sagittariusCard.style.transform = 'scale(1.02)';
            sagittariusCard.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
            
            // Aggiungi un messaggio speciale
            const specialMessage = document.createElement('div');
            specialMessage.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                padding: 0.75rem;
                border-radius: 8px;
                margin-top: 1rem;
                font-weight: 600;
                text-align: center;
            `;
            specialMessage.innerHTML = '🎯 Sei un vero Sagittario! ♐';
            sagittariusCard.appendChild(specialMessage);
        }
        
        // Mostra i risultati con animazione
        this.results.classList.remove('hidden');
        this.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Aggiungi stili CSS per le animazioni toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inizializza l'applicazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    new AstrologyApp();
});

// Gestisce l'installazione della PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Crea un pulsante per l'installazione
    const installButton = document.createElement('button');
    installButton.textContent = '📱 Installa App';
    installButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
    `;
    
    installButton.addEventListener('click', async () => {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installButton.remove();
        }
        deferredPrompt = null;
    });
    
    document.body.appendChild(installButton);
});