import './promo.css';
import HeroSection from './_sections/hero-section';
import FeaturesSection from './_sections/features-section';
import CharactersSection from './_sections/characters-section';
import ComicSection from './_sections/comic-section';
import CtaSection from './_sections/cta-section';
import FooterSection from './_sections/footer-section';

export default function PromoPage() {
  return (
    <div className="promo-root">
      <HeroSection />
      <FeaturesSection />
      <CharactersSection />
      <ComicSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
