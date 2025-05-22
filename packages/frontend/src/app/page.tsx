import { HeroSection } from '@/components/sections/HeroSection';
import { PlanSection } from '@/components/sections/PlanSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { getArticles } from '@/lib/articles';

// 動的レンダリングを有効化
export const dynamic = 'force-dynamic';

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <HeroSection />

      <FeatureSection />
      
      <PlanSection />
      
      <TestimonialSection />

      <BlogSection articles={articles} />

      <Footer />
    </main>
  );
}
