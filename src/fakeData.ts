import type {
  ChatData,
  Participant,
  TimeActivity,
  WordFrequency,
} from "./components/chat-analyzer";

// Modificar la función generateFakeData para incluir el nombre del grupo
export const generateFakeData = (): ChatData => {
  // Crear participantes ficticios
  const participants: Participant[] = [
    {
      name: "María García",
      messageCount: 1245,
      wordCount: 8976,
      characterCount: 42560,
      mediaCount: 87,
      color: "#FF6B6B",
    },
    {
      name: "Juan Pérez",
      messageCount: 982,
      wordCount: 5621,
      characterCount: 28450,
      mediaCount: 45,
      color: "#4ECDC4",
    },
    {
      name: "Ana Rodríguez",
      messageCount: 754,
      wordCount: 6234,
      characterCount: 32180,
      mediaCount: 62,
      color: "#FFD166",
    },
    {
      name: "Carlos López",
      messageCount: 523,
      wordCount: 3245,
      characterCount: 18760,
      mediaCount: 28,
      color: "#06D6A0",
    },
    {
      name: "Laura Martínez",
      messageCount: 412,
      wordCount: 2876,
      characterCount: 15430,
      mediaCount: 19,
      color: "#118AB2",
    },
  ];

  // Crear actividad por hora
  const timeActivity: TimeActivity[] = Array(24)
    .fill(0)
    .map((_, hour) => {
      // Simular un patrón realista con más actividad durante la tarde/noche
      let count = 0;
      if (hour < 7) {
        count = Math.floor(Math.random() * 50); // Poca actividad en la madrugada
      } else if (hour < 12) {
        count = 100 + Math.floor(Math.random() * 150); // Actividad media en la mañana
      } else if (hour < 16) {
        count = 150 + Math.floor(Math.random() * 100); // Actividad media-alta al mediodía
      } else if (hour < 22) {
        count = 200 + Math.floor(Math.random() * 250); // Alta actividad en la tarde/noche
      } else {
        count = 100 + Math.floor(Math.random() * 150); // Actividad media-baja en la noche
      }
      return { hour, count };
    });

  // Palabras frecuentes ficticias
  const commonSpanishWords = [
    "hola",
    "gracias",
    "bien",
    "jaja",
    "vale",
    "bueno",
    "claro",
    "genial",
    "mañana",
    "ahora",
    "siempre",
    "nunca",
    "quizás",
    "también",
    "nada",
    "mucho",
    "poco",
    "tarde",
    "temprano",
    "casa",
    "trabajo",
    "fiesta",
    "comida",
    "tiempo",
    "día",
    "noche",
    "semana",
    "mes",
    "año",
    "amigo",
    "familia",
    "vida",
    "amor",
    "feliz",
    "triste",
    "cansado",
    "divertido",
  ];

  const wordFrequency: WordFrequency[] = commonSpanishWords
    .map((word) => ({
      text: word,
      value: 20 + Math.floor(Math.random() * 180), // Entre 20 y 200 ocurrencias
    }))
    .sort((a, b) => b.value - a.value);

  // Calcular total de mensajes
  const totalMessages = participants.reduce(
    (sum, p) => sum + p.messageCount,
    0
  );

  return {
    participants,
    timeActivity,
    wordFrequency,
    emojiFrequency: [
      { text: "😂", value: 120 },
      { text: "❤️", value: 95 },
      { text: "👍", value: 80 },
      { text: "😢", value: 60 },
      { text: "🔥", value: 50 },
      { text: "🎉", value: 45 },
      { text: "😎", value: 40 },
      { text: "😍", value: 35 },
      { text: "🙌", value: 30 },
      { text: "💔", value: 25 },
    ],
    totalMessages,
    dateRange: { start: "01/01/2023", end: "31/12/2023" },
    mostActiveDay: { date: "15/06/2023", count: 245 },
    groupName: "Amigos del instituto", // Nombre del grupo para los datos de ejemplo
  };
};
