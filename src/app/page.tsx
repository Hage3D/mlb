import { redirect } from 'next/navigation';
import { getLatestGameDate } from '@/lib/mlb-api';

export default async function HomePage() {
  const latestDate = await getLatestGameDate();
  redirect(`/date/${latestDate}`);
}