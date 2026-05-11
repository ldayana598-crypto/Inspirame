type Session = {
  id: string;
  userId: string;
  date: number;
  basket: any[];
  reflection: string;
};

export const StorageService = {
  saveSession: (userId: string, basket: any[], reflection: string) => {
    const sessions = StorageService.getSessions(userId);
    const newSession: Session = {
      id: Date.now().toString(),
      userId,
      date: Date.now(),
      basket,
      reflection,
    };
    sessions.push(newSession);
    localStorage.setItem(`creativity_sessions_${userId}`, JSON.stringify(sessions));
  },

  getSessions: (userId: string): Session[] => {
    const data = localStorage.getItem(`creativity_sessions_${userId}`);
    return data ? JSON.parse(data) : [];
  }
};
