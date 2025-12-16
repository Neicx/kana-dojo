import { Metadata } from 'next';
import AchievementProgress from '@/features/Achievements/components/AchievementProgress';
import SidebarLayout from '@/shared/components/layout/SidebarLayout';

export const metadata: Metadata = {
  title: 'Achievements - Track Your Japanese Learning Progress',
  description:
    'Track your Japanese learning progress and unlock achievements in KanaDojo. Monitor your mastery of Hiragana, Katakana, Kanji, and Vocabulary with detailed statistics and milestones.',
  openGraph: {
    title: 'Achievements - Track Your Japanese Learning Progress',
    description:
      'Monitor your Japanese learning journey with detailed achievements and progress tracking.',
    url: 'https://kanadojo.com/achievements',
    type: 'website'
  },
  alternates: {
    canonical: 'https://kanadojo.com/achievements'
  }
};

export default function AchievementsPage() {
  return (
    <SidebarLayout>
      <AchievementProgress />
    </SidebarLayout>
  );
}
