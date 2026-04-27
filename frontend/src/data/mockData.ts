export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  levelName: string;
  currentXp: number;
  targetXp: number;
  streak: number;
  streakDays: boolean[]; // e.g. [true, true, true, true, true, false, false] for Mon-Sun
}

export interface LessonProgress {
  id: string;
  moduleTitle: string;
  lessonTitle: string;
  progressPercentage: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  xpReward: number;
  status: 'completed' | 'active' | 'locked';
}

export interface Badge {
  id: string;
  title: string;
  icon: string; // We'll map this to a Lucide icon or image later
  unlocked: boolean;
}

export interface MockData {
  user: User;
  lastLesson: LessonProgress;
  dailyChallenges: DailyChallenge[];
  badges: Badge[];
  learningActivity: number[]; // e.g. hours or XP per day for the week
}

export const mockData: MockData = {
  user: {
    id: 'usr_001',
    name: 'Budi',
    avatar: 'https://i.pravatar.cc/150?u=budi',
    level: 5,
    levelName: 'Pelajar Aktif',
    currentXp: 1250,
    targetXp: 2500,
    streak: 14,
    streakDays: [true, true, true, true, true, false, false], // S, S, R, K, J, S, M
  },
  lastLesson: {
    id: 'les_004_03',
    moduleTitle: 'Modul 4: Ekspresi Wajah & Emosi',
    lessonTitle: 'Pelajaran 3: Menyampaikan Empati dan Kesedihan.',
    progressPercentage: 60,
  },
  dailyChallenges: [
    {
      id: 'dc_1',
      title: 'Selesaikan 1 pelajaran',
      xpReward: 50,
      status: 'completed',
    },
    {
      id: 'dc_2',
      title: 'Praktik Gerakan 5 Menit',
      xpReward: 100,
      status: 'active',
    },
    {
      id: 'dc_3',
      title: 'Jawab 3 Kuis dengan Benar',
      xpReward: 150,
      status: 'locked',
    },
  ],
  badges: [
    {
      id: 'bg_1',
      title: 'Setiakawan',
      icon: 'Handshake',
      unlocked: true,
    },
    {
      id: 'bg_2',
      title: 'Master Abjad',
      icon: 'Type',
      unlocked: true,
    },
    {
      id: 'bg_3',
      title: 'Komunitas',
      icon: 'Users',
      unlocked: true,
    },
    {
      id: 'bg_4',
      title: 'Artikel Dasar',
      icon: 'Lock',
      unlocked: false,
    },
  ],
  learningActivity: [10, 20, 15, 45, 0, 0, 0], // Sen, Sel, Rab, Kam, Jum, Sab, Min
};
