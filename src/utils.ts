import type { ChatData, Participant } from "./components/chat-analyzer";

// Modificar la función parseWhatsAppChat para excluir el grupo y mejorar detección multimedia
export const parseWhatsAppChat = (
  chatText: string,
  groupName: string
): ChatData => {
  // Regex para detectar líneas de mensajes de WhatsApp
  // Formato típico: [DD/MM/YY, HH:MM:SS] Nombre: Mensaje
  const messageRegex =
    /\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{1,2}(?::\d{1,2})?)\]\s([^:]+):\s(.*)/g;

  // Colores para los participantes
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#EF476F",
    "#FFC43D",
    "#1B9AAA",
    "#6A0572",
    "#AB83A1",
  ];

  const participantsMap = new Map<string, Participant>();
  const hourCounts = Array(24)
    .fill(0)
    .map((_, i) => ({ hour: i, count: 0 }));
  const wordFrequency = new Map<string, number>();

  let totalMessages = 0;
  let startDate = "";
  let endDate = "";
  const dayCountMap = new Map<string, number>();

  let match;
  // Crear una copia del texto para usar con el regex
  const textCopy = chatText.slice();
  while ((match = messageRegex.exec(textCopy)) !== null) {
    const [_, date, time, name, message] = match;

    // Actualizar fechas
    if (!startDate || date < startDate) startDate = date;
    if (!endDate || date > endDate) endDate = date;

    // Contar mensajes por día
    if (!dayCountMap.has(date)) {
      dayCountMap.set(date, 1);
    } else {
      dayCountMap.set(date, dayCountMap.get(date)! + 1);
    }

    // Actualizar hora de actividad
    const hour = Number.parseInt(time.split(":")[0]);
    hourCounts[hour].count++;

    // Saltar si es el grupo
    if (name === groupName) {
      totalMessages++;
      continue;
    }

    // Actualizar estadísticas del participante
    if (!participantsMap.has(name)) {
      participantsMap.set(name, {
        name,
        messageCount: 0,
        wordCount: 0,
        characterCount: 0,
        mediaCount: 0,
        color: colors[participantsMap.size % colors.length],
      });
    }

    const participant = participantsMap.get(name)!;
    participant.messageCount++;

    // Detectar mensajes multimedia (ampliado para incluir "imagen omitida")
    const isMedia =
      message.includes("<Media omitido>") ||
      message.includes("<Media omitted>") ||
      message.includes("imagen omitida") ||
      message.includes("image omitted") ||
      message.includes("GIF omitido") ||
      message.includes("GIF omitted") ||
      message.includes("sticker omitido") ||
      message.includes("sticker omitted") ||
      message.includes("video omitido") ||
      message.includes("video omitted") ||
      message.includes("audio omitido") ||
      message.includes("audio omitted");

    if (isMedia) {
      participant.mediaCount++;
    } else {
      // Solo contar palabras y caracteres si no es un mensaje multimedia
      const words = message.split(/\s+/).filter((word) => word.length > 0);
      participant.wordCount += words.length;
      participant.characterCount += message.length;

      // Contar frecuencia de palabras (ignorando palabras comunes)
      const commonWords = [
        "el",
        "la",
        "los",
        "las",
        "un",
        "una",
        "y",
        "o",
        "a",
        "de",
        "en",
        "que",
        "por",
        "con",
        "para",
        "es",
        "al",
        "del",
        "lo",
        "como",
        "más",
        "pero",
        "sus",
        "le",
        "ya",
        "su",
        "mi",
        "me",
        "tu",
        "te",
        "se",
        "nos",
        "muy",
      ];
      words.forEach((word) => {
        const cleanWord = word
          .toLowerCase()
          .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        if (cleanWord.length > 3 && !commonWords.includes(cleanWord)) {
          wordFrequency.set(cleanWord, (wordFrequency.get(cleanWord) || 0) + 1);
        }
      });
    }

    totalMessages++;
  }

  // Encontrar el día más activo
  let mostActiveDay = { date: "", count: 0 };
  dayCountMap.forEach((count, date) => {
    if (count > mostActiveDay.count) {
      mostActiveDay = { date, count };
    }
  });

  // Convertir el mapa de frecuencia de palabras a array y ordenar
  const wordFrequencyArray = Array.from(wordFrequency.entries())
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 100); // Limitar a las 100 palabras más frecuentes

  return {
    participants: Array.from(participantsMap.values()).sort(
      (a, b) => b.messageCount - a.messageCount
    ),
    timeActivity: hourCounts,
    wordFrequency: wordFrequencyArray,
    totalMessages,
    dateRange: { start: startDate, end: endDate },
    mostActiveDay,
    groupName, // Añadir el nombre del grupo a los datos
  };
};

export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&[a-z]+;/gi, "")
    .replace(/[\u200B-\u200F\uFEFF]/g, "")
    .trim();
};

export const cleanText = (text: string): string => {
  return text
    .replace(/&[a-z]+;/gi, "") // elimina entidades HTML como &lrm;
    .replace(/[\u200B-\u200F\uFEFF]/g, "") // elimina LRM, RLM, BOM, etc.
    .trim();
};

// Añadir función para detectar participantes
export const detectParticipants = (chatText: string): string[] => {
  const messageRegex =
    /\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{1,2}(?::\d{1,2})?)\]\s([^:]+):\s(.*)/g;
  const participants = new Set<string>();

  let match;
  // Crear una copia del texto para usar con el regex
  const textCopy = chatText.slice();
  while ((match = messageRegex.exec(textCopy)) !== null) {
    const [_, __, ___, name] = match;
    participants.add(cleanText(name));
  }

  const excludedNames = ["Tú", "You"];
  return Array.from(participants)
    .filter((name) => !excludedNames.includes(name))
    .sort();
};
