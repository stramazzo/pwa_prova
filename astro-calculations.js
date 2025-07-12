// Calcoli astrologici per segni zodiacali e ascendenti

// Date dei segni zodiacali (formato MM-DD)
const ZODIAC_DATES = [
    { sign: 'Capricorno', start: '12-22', end: '01-19', symbol: '♑', dates: '22 Dic - 19 Gen' },
    { sign: 'Acquario', start: '01-20', end: '02-18', symbol: '♒', dates: '20 Gen - 18 Feb' },
    { sign: 'Pesci', start: '02-19', end: '03-20', symbol: '♓', dates: '19 Feb - 20 Mar' },
    { sign: 'Ariete', start: '03-21', end: '04-19', symbol: '♈', dates: '21 Mar - 19 Apr' },
    { sign: 'Toro', start: '04-20', end: '05-20', symbol: '♉', dates: '20 Apr - 20 Mag' },
    { sign: 'Gemelli', start: '05-21', end: '06-20', symbol: '♊', dates: '21 Mag - 20 Giu' },
    { sign: 'Cancro', start: '06-21', end: '07-22', symbol: '♋', dates: '21 Giu - 22 Lug' },
    { sign: 'Leone', start: '07-23', end: '08-22', symbol: '♌', dates: '23 Lug - 22 Ago' },
    { sign: 'Vergine', start: '08-23', end: '09-22', symbol: '♍', dates: '23 Ago - 22 Set' },
    { sign: 'Bilancia', start: '09-23', end: '10-22', symbol: '♎', dates: '23 Set - 22 Ott' },
    { sign: 'Scorpione', start: '10-23', end: '11-21', symbol: '♏', dates: '23 Ott - 21 Nov' },
    { sign: 'Sagittario', start: '11-22', end: '12-21', symbol: '♐', dates: '22 Nov - 21 Dic' }
];

// Descrizioni dei segni zodiacali
const ZODIAC_DESCRIPTIONS = {
    'Ariete': 'Dinamico, coraggioso e sempre pronto all\'azione. Ama essere leader e affrontare nuove sfide.',
    'Toro': 'Stabile, determinato e amante del comfort. Apprezza la bellezza e i piaceri della vita.',
    'Gemelli': 'Comunicativo, versatile e curioso. Ama imparare e condividere informazioni.',
    'Cancro': 'Sensibile, protettivo e intuitivo. Ha un forte legame con la famiglia e la casa.',
    'Leone': 'Carismatico, generoso e creativo. Ama essere al centro dell\'attenzione.',
    'Vergine': 'Pratico, analitico e perfezionista. Attenzione ai dettagli e al servizio agli altri.',
    'Bilancia': 'Diplomatico, equilibrato e amante dell\'armonia. Cerca sempre la giustizia e la bellezza.',
    'Scorpione': 'Intenso, misterioso e trasformativo. Possiede una forte intuizione e magnetismo.',
    'Sagittario': 'Avventuroso, ottimista e filosofico. Ama viaggiare e esplorare nuovi orizzonti.',
    'Capricorno': 'Ambizioso, disciplinato e pragmatico. Orientato agli obiettivi e al successo.',
    'Acquario': 'Innovativo, indipendente e umanitario. Visionario e amante della libertà.',
    'Pesci': 'Empatico, artistico e spirituale. Altamente intuitivo e compassionevole.'
};

// Descrizioni degli ascendenti
const ASCENDANT_DESCRIPTIONS = {
    'Ariete': 'Appari energico e diretto. Gli altri ti vedono come una persona d\'azione e leadership.',
    'Toro': 'Appari calmo e affidabile. Gli altri ti percepiscono come stabile e rassicurante.',
    'Gemelli': 'Appari comunicativo e vivace. Gli altri ti vedono come intelligente e versatile.',
    'Cancro': 'Appari protettivo e sensibile. Gli altri ti percepiscono come premuroso e familiare.',
    'Leone': 'Appari sicuro e carismatico. Gli altri ti vedono come una presenza magnetica.',
    'Vergine': 'Appari ordinato e preciso. Gli altri ti percepiscono come competente e affidabile.',
    'Bilancia': 'Appari elegante e diplomatico. Gli altri ti vedono come armonioso e attraente.',
    'Scorpione': 'Appari intenso e misterioso. Gli altri ti percepiscono come magnetico e profondo.',
    'Sagittario': 'Appari ottimista e avventuroso. Gli altri ti vedono come espansivo e filosofico.',
    'Capricorno': 'Appari serio e ambizioso. Gli altri ti percepiscono come responsabile e maturo.',
    'Acquario': 'Appari originale e indipendente. Gli altri ti vedono come innovativo e libero.',
    'Pesci': 'Appari dolce e spirituale. Gli altri ti percepiscono come sensibile e artistico.'
};

/**
 * Calcola il segno zodiacale basato sulla data di nascita
 */
function calculateZodiacSign(birthDate) {
    const date = new Date(birthDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const monthDay = `${month}-${day}`;
    
    for (const zodiac of ZODIAC_DATES) {
        const start = zodiac.start;
        const end = zodiac.end;
        
        // Gestisce il caso del Capricorno che attraversa l'anno nuovo
        if (start > end) {
            if (monthDay >= start || monthDay <= end) {
                return {
                    sign: zodiac.sign,
                    symbol: zodiac.symbol,
                    dates: zodiac.dates,
                    description: ZODIAC_DESCRIPTIONS[zodiac.sign]
                };
            }
        } else {
            if (monthDay >= start && monthDay <= end) {
                return {
                    sign: zodiac.sign,
                    symbol: zodiac.symbol,
                    dates: zodiac.dates,
                    description: ZODIAC_DESCRIPTIONS[zodiac.sign]
                };
            }
        }
    }
    
    return null;
}

/**
 * Converte gradi in radianti
 */
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Converte radianti in gradi
 */
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

/**
 * Normalizza un angolo tra 0 e 360 gradi
 */
function normalizeAngle(angle) {
    while (angle < 0) angle += 360;
    while (angle >= 360) angle -= 360;
    return angle;
}

/**
 * Calcola il numero di giorni giuliani
 */
function calculateJulianDay(date, time, utcOffset = 0) {
    const [hours, minutes] = time.split(':').map(Number);
    const totalHours = hours + minutes / 60 - utcOffset;
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + totalHours / 24;
    
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

/**
 * Calcola il tempo siderale locale
 */
function calculateLocalSiderealTime(julianDay, longitude) {
    const T = (julianDay - 2451545.0) / 36525;
    
    // Tempo siderale medio di Greenwich a 0h UT
    let GMST = 280.46061837 + 360.98564736629 * (julianDay - 2451545) + 0.000387933 * T * T - T * T * T / 38710000;
    
    GMST = normalizeAngle(GMST);
    
    // Tempo siderale locale
    const LST = normalizeAngle(GMST + longitude);
    
    return LST;
}

/**
 * Calcola l'obliquità dell'eclittica
 */
function calculateObliquity(julianDay) {
    const T = (julianDay - 2451545.0) / 36525;
    const obliquity = 23.4392911 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
    return obliquity;
}

/**
 * Calcola la posizione del Sole
 */
function calculateSunPosition(julianDay) {
    const n = julianDay - 2451545.0;
    const L = normalizeAngle(280.460 + 0.9856474 * n);
    const g = toRadians(normalizeAngle(357.528 + 0.9856003 * n));
    const lambda = normalizeAngle(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
    
    return {
        longitude: lambda,
        rightAscension: lambda, // Semplificazione
        declination: 0 // Semplificazione
    };
}

/**
 * Calcola l'ascendente usando metodi astronomici semplificati
 */
function calculateAscendant(birthDate, birthTime, latitude, longitude) {
    try {
        const date = new Date(birthDate);
        const julianDay = calculateJulianDay(date, birthTime);
        const lst = calculateLocalSiderealTime(julianDay, longitude);
        const obliquity = calculateObliquity(julianDay);
        const sunPos = calculateSunPosition(julianDay);
        
        // Calcolo semplificato dell'ascendente
        // Questo è un metodo approssimativo che considera principalmente il tempo siderale locale
        const ascendantDegree = normalizeAngle(lst + sunPos.longitude);
        
        // Determina il segno zodiacale dell'ascendente
        const signIndex = Math.floor(ascendantDegree / 30);
        const ascendantSign = ZODIAC_DATES[signIndex % 12];
        
        return {
            sign: ascendantSign.sign,
            symbol: ascendantSign.symbol,
            degree: Math.round((ascendantDegree % 30) * 100) / 100,
            description: ASCENDANT_DESCRIPTIONS[ascendantSign.sign]
        };
        
    } catch (error) {
        console.error('Errore nel calcolo dell\'ascendente:', error);
        
        // Calcolo di fallback basato sull'ora di nascita
        const [hours, minutes] = birthTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const signIndex = Math.floor((totalMinutes / (24 * 60)) * 12);
        const fallbackSign = ZODIAC_DATES[signIndex % 12];
        
        return {
            sign: fallbackSign.sign,
            symbol: fallbackSign.symbol,
            degree: Math.round(((totalMinutes % 120) / 4) * 100) / 100,
            description: ASCENDANT_DESCRIPTIONS[fallbackSign.sign],
            warning: 'Calcolo approssimativo - per maggiore precisione verifica i dati'
        };
    }
}

/**
 * Funzione principale per calcolare sia il segno zodiacale che l'ascendente
 */
function calculateAstrology(birthData) {
    const { birthDate, birthTime, latitude, longitude } = birthData;
    
    const zodiacSign = calculateZodiacSign(birthDate);
    const ascendant = calculateAscendant(birthDate, birthTime, parseFloat(latitude), parseFloat(longitude));
    
    return {
        zodiacSign,
        ascendant,
        isSagittarius: zodiacSign.sign === 'Sagittario'
    };
}