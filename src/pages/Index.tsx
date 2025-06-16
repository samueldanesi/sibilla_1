import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
// Note: Lenis can be added later for premium smooth scrolling
// import { Lenis } from "@studio-freight/lenis";

// Components
import { PremiumLoader } from "@/components/PremiumLoader";
import { AgeVerificationOverlay } from "@/components/AgeVerificationOverlay";
import { MobileRedirectOverlay } from "@/components/MobileRedirectOverlay";
import { FixedHeader } from "@/components/FixedHeader";
import { NavigationMenu } from "@/components/NavigationMenu";
import { HeroSection } from "@/components/HeroSection";
import { ShareButton } from "@/components/ShareButton";
import { InstructionsSection } from "@/components/InstructionsSection";
import { DescriptionSection } from "@/components/DescriptionSection";
import { SpecificationsSection } from "@/components/SpecificationsSection";
import { CocktailsSection } from "@/components/CocktailsSection";
import { Footer } from "@/components/Footer";

// Data
import { fetchCMSData, type CMSData } from "@/data/cms";

const Index = () => {
  const { t } = useTranslation();

  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [showMobileRedirect, setShowMobileRedirect] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [isOfAge, setIsOfAge] = useState<boolean | null>(null);
  const [cmsData, setCmsData] = useState<CMSData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch CMS data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const data = await fetchCMSData(i18n.language);
        setCmsData(data);

        // Simulate minimum loading time for smooth UX
        setTimeout(() => {
          setIsLoading(false);
          setShowAgeVerification(true);
        }, 2000);
      } catch (err) {
        setError("Failed to load content");
        setIsLoading(false);
      }
    };

    loadData();
  }, [i18n.language]);

  // Check if user is on desktop and show mobile redirect
  useEffect(() => {
    if (!isOfAge || !cmsData) return;

    const checkDevice = () => {
      const isMobile =
        window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        setTimeout(() => setShowMobileRedirect(true), 500);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [isOfAge, cmsData]);

  const handleAgeVerification = (verified: boolean) => {
    if (verified) {
      setIsOfAge(true);
      setShowAgeVerification(false);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Trigger data refetch
    window.location.reload();
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">{t("error.title")}</h1>
          <p className="text-lg text-brand-black/70">{t("error.subtitle")}</p>
          <button
            onClick={handleRetry}
            className="bg-brand-black text-brand-white px-8 py-3 hover:bg-brand-white hover:text-brand-black border border-brand-black transition-colors duration-300"
          >
            {t("error.retry")}
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading || !cmsData) {
    return <PremiumLoader isVisible={true} />;
  }

  // Age verification state
  if (!isOfAge) {
    return (
      <AgeVerificationOverlay
        isVisible={showAgeVerification}
        onVerify={handleAgeVerification}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-brand-black">
      <AnimatePresence mode="wait">
        {/* Mobile Redirect Overlay */}
        {showMobileRedirect && (
          <MobileRedirectOverlay
            key="mobile-redirect"
            isVisible={showMobileRedirect}
            onClose={() => setShowMobileRedirect(false)}
          />
        )}

        {/* Navigation Menu */}
        {showNavigation && (
          <NavigationMenu
            key="navigation-menu"
            isOpen={showNavigation}
            onClose={() => setShowNavigation(false)}
            onNavigate={handleNavigation}
          />
        )}
      </AnimatePresence>

      {/* Fixed Header - Outside AnimatePresence since it's always visible */}
      <FixedHeader
        onMenuToggle={() => setShowNavigation(!showNavigation)}
        onLogoClick={scrollToTop}
      />

      {/* Main Content */}
      <main className="relative">
        <HeroSection productData={cmsData.product} />
        <InstructionsSection instructionsData={cmsData.instructions} />
        <SpecificationsSection
          specifications={cmsData.product.specifications}
        />
        <DescriptionSection productData={cmsData.product} />
        <CocktailsSection recipesData={cmsData.recipes} />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={scrollToTop} />

      {/* Share Button */}
      <ShareButton />
    </div>
  );
};

export default Index;
