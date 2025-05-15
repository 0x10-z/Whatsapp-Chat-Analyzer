import type { LanguageCode } from "./contexts/translation-context";

export const translations = {
  es: {
    title: "Analizador de chats de WhatsApp",
    description:
      "Descubre quién habla más, las palabras más usadas, actividad por hora y otras curiosidades de tu grupo.",
    upload_drop: "Arrastra y suelta tu archivo de chat",
    upload_drop_active: "Suelta el archivo aquí",
    upload_click: "o haz clic para seleccionar",
    upload_button: "Seleccionar archivo",
    upload_error:
      "Por favor, sube un archivo de texto (.txt) exportado desde WhatsApp.",
    analyzing: "Analizando tu chat...",
    alertInvalid:
      "Error al analizar el chat. Por favor, asegúrate de que es un archivo de chat de WhatsApp válido.",
    alertNoGroup: "Por favor, selecciona el nombre del grupo",
    analyzeAnother: "Analizar otro chat",
    groupAnalysis: "Análisis del grupo",
    totalMessages: "Total de mensajes",
    mostActiveParticipant: "Participante más activo",
    mostActiveHour: "Hora más activa",
    na: "N/D",
    times: "veces",
    activityChartTitle: "Actividad por hora",
    tabs: {
      participants: "Participantes",
      activity: "Actividad",
      words: "Palabras",
      stats: "Estadísticas",
      fun: "Curiosidades",
    },
    titles: {
      mostTalkative: "¿Quién habla más?",
      timeActivity: "¿Cuándo hablan más?",
      wordCloud: "Palabras más usadas",
      stats: "Estadísticas generales",
      funFacts: "Curiosidades del chat",
    },
    stats: {
      period: "Periodo del chat",
      mostActiveDay: "Día más activo",
      avgWords: "Promedio de palabras por mensaje",
      totalParticipants: "Total de participantes",
      totalMedia: "Total de multimedia",
      mostUsedWord: "Palabra más usada",
      messages: "mensajes",
    },
    tags: {
      coffeeHourTitle: "Hora del café",
      coffeeHourDescription:
        "La hora más activa del chat es a las {hour}:00, con {count} mensajes.",
      dayPeopleTitle: "Personas diurnas",
      nightOwlsTitle: "Búhos nocturnos",
      dayNightDescription:
        "Este grupo habla más durante {period}, con un {percentage}% de los mensajes.",
      day: "el día",
      night: "la noche",
      prolificTitle: "Escritor/a prolífico/a",
      prolificDescription:
        "{name} escribe los mensajes más largos, con un promedio de {length} caracteres por mensaje.",
      mediaTitle: "Rey/Reina de la multimedia",
      mediaDescription: "{name} ha enviado {count} archivos multimedia.",
      funFactsTitle: "Datos curiosos",
      shortMessages:
        "{name} es quien escribe los mensajes más cortos (promedio de {length} caracteres).",
      mostUsedWord:
        "La palabra más usada en el chat es {word}, que aparece {count} veces.",
      mostActiveDay: "El día más activo fue el {date}, con {count} mensajes.",
      avgWordsPerMessage:
        "En promedio, cada mensaje contiene {average} palabras.",
    },
    groupSelector: {
      title: "Selecciona el nombre del grupo",
      description:
        "Elige el nombre del grupo para excluirlo de las estadísticas de participantes",
      cancel: "Cancelar",
      continue: "Continuar",
    },
    topParticipants: {
      title: "Top Participantes",
      messages: "mensajes",
      words: "Palabras",
      characters: "Caracteres",
      media: "Multimedia",
    },
    upload: {
      title: "Sube tu chat de WhatsApp",
      description:
        "Exporta un chat desde WhatsApp y súbelo aquí para descubrir estadísticas interesantes",
      or: "o",
      useExample: "Usar datos de ejemplo",
      privacyNotice:
        "Tus datos no se almacenan en ningún servidor. Todo el análisis se realiza en tu navegador.",
    },
    activity: {
      mostActive: "La hora más activa es a las {hour}:00.",
      leastActive: "La hora menos activa es a las {hour}:00.",
    },
  },
  en: {
    title: "WhatsApp Chat Analyzer",
    description:
      "Discover who talks the most, the most used words, hourly activity, and other curiosities from your group.",
    upload_drop: "Drag and drop your chat file",
    upload_drop_active: "Drop the file here",
    upload_click: "or click to select",
    upload_button: "Select file",
    upload_error: "Please upload a text file (.txt) exported from WhatsApp.",
    analyzing: "Analyzing your chat...",
    alertInvalid:
      "Error analyzing the chat. Please make sure it is a valid WhatsApp chat file.",
    alertNoGroup: "Please select the group name",
    analyzeAnother: "Analyze another chat",
    groupAnalysis: "Group analysis",
    totalMessages: "Total messages",
    mostActiveParticipant: "Most active participant",
    mostActiveHour: "Most active hour",
    na: "N/A",
    times: "times",
    activityChartTitle: "Activity by hour of the day",
    tabs: {
      participants: "Participants",
      activity: "Activity",
      words: "Words",
      stats: "Statistics",
      fun: "Fun facts",
    },
    titles: {
      mostTalkative: "Who talks the most?",
      timeActivity: "When do they talk the most?",
      wordCloud: "Most used words",
      stats: "General statistics",
      funFacts: "Chat fun facts",
    },
    stats: {
      period: "Chat period",
      mostActiveDay: "Most active day",
      avgWords: "Average words per message",
      totalParticipants: "Total participants",
      totalMedia: "Total media files",
      mostUsedWord: "Most used word",
      messages: "messages",
    },
    tags: {
      coffeeHourTitle: "Coffee hour",
      coffeeHourDescription:
        "The most active hour is {hour}:00, with {count} messages.",
      dayPeopleTitle: "Day people",
      nightOwlsTitle: "Night owls",
      dayNightDescription:
        "This group chats more during {period}, accounting for {percentage}% of messages.",
      day: "the day",
      night: "the night",
      prolificTitle: "Prolific writer",
      prolificDescription:
        "{name} writes the longest messages, with an average of {length} characters per message.",
      mediaTitle: "Media king/queen",
      mediaDescription: "{name} has sent {count} media files.",
      funFactsTitle: "Fun facts",
      shortMessages:
        "{name} writes the shortest messages (average of {length} characters).",
      mostUsedWord: "The most used word is {word}, appearing {count} times.",
      mostActiveDay: "The most active day was {date}, with {count} messages.",
      avgWordsPerMessage: "On average, each message contains {average} words.",
    },
    groupSelector: {
      title: "Select the group name",
      description:
        "Choose the group name to exclude it from the participant statistics",
      cancel: "Cancel",
      continue: "Continue",
    },
    topParticipants: {
      title: "Top Participants",
      messages: "messages",
      words: "Words",
      characters: "Characters",
      media: "Media",
    },
    upload: {
      title: "Upload your WhatsApp chat",
      description:
        "Export a chat from WhatsApp and upload it here to discover interesting statistics",
      or: "or",
      useExample: "Use example data",
      privacyNotice:
        "Your data is not stored on any server. All analysis is done in your browser.",
    },
    activity: {
      mostActive: "The most active hour is at {hour}:00.",
      leastActive: "The least active hour is at {hour}:00.",
    },
  },
  eu: {
    title: "WhatsApp txataren aztertzailea",
    description:
      "Jakizu nork hitz egiten duen gehien, hitz erabilienak, ordutegiko jarduera eta zure taldeko bitxikeriak.",
    upload_drop: "Arrastatu eta jaregin zure txat fitxategia",
    upload_drop_active: "Jaregin fitxategia hemen",
    upload_click: "edo egin klik hautatzeko",
    upload_button: "Hautatu fitxategia",
    upload_error:
      "Mesedez, igo WhatsAppetik esportatutako testu fitxategi bat (.txt).",
    analyzing: "Zure txata aztertzen...",
    alertInvalid:
      "Errorea txata aztertzean. Ziurtatu WhatsApp txat balioduna dela.",
    alertNoGroup: "Mesedez, hautatu taldearen izena",
    analyzeAnother: "Aztertu beste txat bat",
    groupAnalysis: "Taldearen analisia",
    totalMessages: "Mezu guztiak",
    mostActiveParticipant: "Parte-hartzaile aktiboena",
    mostActiveHour: "Ordu aktiboena",
    na: "E/E",
    times: "aldiz",
    activityChartTitle: "Eguneko orduen araberako jarduera",
    tabs: {
      participants: "Parte-hartzaileak",
      activity: "Jarduera",
      words: "Hitzak",
      stats: "Estatistikak",
      fun: "Bitxikeriak",
    },
    titles: {
      mostTalkative: "Nork hitz egiten du gehien?",
      timeActivity: "Noiz hitz egiten dute gehien?",
      wordCloud: "Hitz erabilienak",
      stats: "Estatistika orokorrak",
      funFacts: "Txataren bitxikeriak",
    },
    stats: {
      period: "Txataren aldia",
      mostActiveDay: "Egun aktiboena",
      avgWords: "Bataz besteko hitzak mezu bakoitzeko",
      totalParticipants: "Parte-hartzaile kopurua",
      totalMedia: "Multimedia guztira",
      mostUsedWord: "Hitz erabiliena",
      messages: "mezu",
    },
    tags: {
      coffeeHourTitle: "Kafe ordua",
      coffeeHourDescription:
        "Txataren ordu aktiboena {hour}:00 da, {count} mezurekin.",
      dayPeopleTitle: "Eguneko pertsonak",
      nightOwlsTitle: "Gaueko mozoloak",
      dayNightDescription:
        "Talde honek gehiago hitz egiten du {period} zehar, mezuen % {percentage}-ekin.",
      day: "egunez",
      night: "gauez",
      prolificTitle: "Idazle oparoa",
      prolificDescription:
        "{name}(e)k mezu luzeenak idazten ditu, bataz beste {length} karaktere mezu bakoitzeko.",
      mediaTitle: "Multimediaren errege/erregina",
      mediaDescription: "{name}(e)k {count} multimedia fitxategi bidali ditu.",
      funFactsTitle: "Bitxikeriak",
      shortMessages:
        "{name}(e)k mezu laburrenak idazten ditu (bataz beste {length} karaktere).",
      mostUsedWord:
        "Txataren hitz erabiliena {word} da, eta {count} aldiz agertzen da.",
      mostActiveDay: "Egun aktiboena {date} izan zen, {count} mezurekin.",
      avgWordsPerMessage: "Bataz beste, mezu bakoitzak {average} hitz ditu.",
    },
    groupSelector: {
      title: "Hautatu taldearen izena",
      description:
        "Aukeratu taldearen izena parte-hartzaileen estatistiketatik kanpo uzteko",
      cancel: "Utzi",
      continue: "Jarraitu",
    },
    topParticipants: {
      title: "Parte-hartzaile nabarmenenak",
      messages: "mezu",
      words: "Hitzak",
      characters: "Karaktereak",
      media: "Multimedia",
    },
    upload: {
      title: "Igo zure WhatsApp txata",
      description:
        "Esportatu txat bat WhatsAppetik eta igo hemen estatistika interesgarriak ezagutzeko",
      or: "edo",
      useExample: "Erabili adibideko datuak",
      privacyNotice:
        "Zure datuak ez dira zerbitzarietan gordetzen. Azterketa guztia zure nabigatzailean egiten da.",
    },
    activity: {
      mostActive: "Ordu aktiboena {hour}:00etan da.",
      leastActive: "Ordu gutxieneko jarduera {hour}:00etan da.",
    },
  },
  ca: {
    title: "Analitzador de xats de WhatsApp",
    description:
      "Descobreix qui parla més, les paraules més usades, l’activitat per hora i altres curiositats del teu grup.",
    upload_drop: "Arrossega i deixa anar el teu fitxer de xat",
    upload_drop_active: "Deixa el fitxer aquí",
    upload_click: "o fes clic per seleccionar",
    upload_button: "Seleccionar fitxer",
    upload_error:
      "Si us plau, puja un fitxer de text (.txt) exportat des de WhatsApp.",
    analyzing: "Analitzant el teu xat...",
    alertInvalid:
      "Error en analitzar el xat. Assegura't que sigui un fitxer de WhatsApp vàlid.",
    alertNoGroup: "Si us plau, selecciona el nom del grup",
    analyzeAnother: "Analitzar un altre xat",
    groupAnalysis: "Anàlisi del grup",
    totalMessages: "Total de missatges",
    mostActiveParticipant: "Participant més actiu",
    mostActiveHour: "Hora més activa",
    na: "N/D",
    times: "vegades",
    activityChartTitle: "Activitat per hora del dia",
    tabs: {
      participants: "Participants",
      activity: "Activitat",
      words: "Paraules",
      stats: "Estadístiques",
      fun: "Curiositats",
    },
    titles: {
      mostTalkative: "Qui parla més?",
      timeActivity: "Quan parlen més?",
      wordCloud: "Paraules més usades",
      stats: "Estadístiques generals",
      funFacts: "Curiositats del xat",
    },
    stats: {
      period: "Període del xat",
      mostActiveDay: "Dia més actiu",
      avgWords: "Mitjana de paraules per missatge",
      totalParticipants: "Total de participants",
      totalMedia: "Total de fitxers multimèdia",
      mostUsedWord: "Paraula més usada",
      messages: "missatges",
    },
    tags: {
      coffeeHourTitle: "Hora del cafè",
      coffeeHourDescription:
        "L’hora més activa del xat és a les {hour}:00, amb {count} missatges.",
      dayPeopleTitle: "Persones diürnes",
      nightOwlsTitle: "Mussols nocturns",
      dayNightDescription:
        "Aquest grup parla més durant {period}, amb un {percentage}% dels missatges.",
      day: "el dia",
      night: "la nit",
      prolificTitle: "Escriptor/a prolífic/a",
      prolificDescription:
        "{name} escriu els missatges més llargs, amb una mitjana de {length} caràcters per missatge.",
      mediaTitle: "Rei/Reina del multimèdia",
      mediaDescription: "{name} ha enviat {count} fitxers multimèdia.",
      funFactsTitle: "Dades curioses",
      shortMessages:
        "{name} escriu els missatges més curts (mitjana de {length} caràcters).",
      mostUsedWord:
        "La paraula més usada en el xat és {word}, que apareix {count} vegades.",
      mostActiveDay:
        "El dia més actiu va ser el {date}, amb {count} missatges.",
      avgWordsPerMessage: "De mitjana, cada missatge conté {average} paraules.",
    },
    groupSelector: {
      title: "Selecciona el nom del grup",
      description:
        "Escull el nom del grup per excloure'l de les estadístiques dels participants",
      cancel: "Cancel·la",
      continue: "Continua",
    },
    topParticipants: {
      title: "Participants destacats",
      messages: "missatges",
      words: "Paraules",
      characters: "Caràcters",
      media: "Multimèdia",
    },
    upload: {
      title: "Puja el teu xat de WhatsApp",
      description:
        "Exporta un xat des de WhatsApp i puja'l aquí per descobrir estadístiques interessants",
      or: "o",
      useExample: "Utilitza dades d'exemple",
      privacyNotice:
        "Les teves dades no s'emmagatzemen en cap servidor. L'anàlisi es fa completament al teu navegador.",
    },
    activity: {
      mostActive: "L'hora més activa és a les {hour}:00.",
      leastActive: "L'hora menys activa és a les {hour}:00.",
    },
  },
};

export const useTranslation = (lang: LanguageCode) => translations[lang];
