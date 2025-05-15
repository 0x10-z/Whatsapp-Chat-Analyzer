import type {
  ChatData,
  Participant,
  TimeActivity,
  WordFrequency,
} from "./components/chat-analyzer";

export const generateFakeData = (): ChatData => {
  const participants: Participant[] = [
    {
      name: "Elon Musk",
      messageCount: 1342,
      wordCount: 10345,
      characterCount: 50500,
      mediaCount: 152,
      color: "#FF6B6B",
    },
    {
      name: "Pedro Sánchez",
      messageCount: 1095,
      wordCount: 7543,
      characterCount: 38500,
      mediaCount: 72,
      color: "#4ECDC4",
    },
    {
      name: "Donald Trump",
      messageCount: 980,
      wordCount: 6999,
      characterCount: 35200,
      mediaCount: 88,
      color: "#FFD166",
    },
    {
      name: "Emmanuel Macron",
      messageCount: 850,
      wordCount: 6230,
      characterCount: 29750,
      mediaCount: 61,
      color: "#06D6A0",
    },
    {
      name: "Javier Milei",
      messageCount: 1200,
      wordCount: 8340,
      characterCount: 41230,
      mediaCount: 77,
      color: "#D97706",
    },
    {
      name: "Gabriel Rufián",
      messageCount: 900,
      wordCount: 6890,
      characterCount: 33210,
      mediaCount: 53,
      color: "#10B981",
    },
    {
      name: "José Elías",
      messageCount: 770,
      wordCount: 5890,
      characterCount: 29840,
      mediaCount: 48,
      color: "#6366F1",
    },
  ];

  const timeActivity: TimeActivity[] = Array(24)
    .fill(0)
    .map((_, hour) => {
      let count = 0;
      if (hour < 7) {
        count = Math.floor(Math.random() * 40);
      } else if (hour < 12) {
        count = 100 + Math.floor(Math.random() * 120);
      } else if (hour < 16) {
        count = 150 + Math.floor(Math.random() * 100);
      } else if (hour < 22) {
        count = 200 + Math.floor(Math.random() * 180);
      } else {
        count = 80 + Math.floor(Math.random() * 100);
      }
      return { hour, count };
    });

  const frikiWords = [
    "spaceX",
    "cohete",
    "mars",
    "subvención",
    "libertad",
    "democracia",
    "nuclear",
    "revolución",
    "memes",
    "threads",
    "AI",
    "china",
    "dinero",
    "república",
    "oligarquía",
    "macronazo",
    "elonada",
    "FakeNews",
    "startup",
    "eurovisión",
    "teleprompter",
    "francia",
    "mileitor",
    "bitcoin",
    "marte",
    "liberté",
    "propaganda",
    "deepfake",
    "Tesla",
    "libertarado",
    "casta",
    "congreso",
    "kilovatio",
    "regulación",
    "comunismo",
    "asamblea",
    "precio",
    "multinacional",
  ];

  const wordFrequency: WordFrequency[] = frikiWords
    .map((word) => ({
      text: word,
      value: 30 + Math.floor(Math.random() * 150),
    }))
    .sort((a, b) => b.value - a.value);

  const totalMessages = participants.reduce(
    (sum, p) => sum + p.messageCount,
    0
  );

  return {
    participants,
    timeActivity,
    wordFrequency,
    emojiFrequency: [
      { text: "🚀", value: 130 },
      { text: "🇦🇷", value: 110 },
      { text: "🇪🇸", value: 95 },
      { text: "🇺🇸", value: 80 },
      { text: "🇫🇷", value: 65 },
      { text: "🔥", value: 60 },
      { text: "🤣", value: 55 },
      { text: "💶", value: 40 },
      { text: "🤯", value: 35 },
      { text: "📉", value: 30 },
    ],
    totalMessages,
    dateRange: { start: "01/01/2024", end: "31/12/2024" },
    mostActiveDay: { date: "06/06/2024", count: 312 },
    groupName: "Club BilderChat™",
  };
};
