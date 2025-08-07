import { mockSites } from '@/lib/mock-data';
import { HomeContent } from '@/components/home-content';

export default async function Home() {
  return <HomeContent initialSites={mockSites} />;
}
