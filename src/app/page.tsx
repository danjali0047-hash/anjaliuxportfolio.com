import LandingSwitch from "./components/LandingSwitch";
import SitePreloader from "./components/SitePreloader";

export default function Home() {
  return (
    <>
      {/* Without scripts nothing would ever dismiss the loading screen, so
          remove it entirely in that case rather than trapping the visitor. */}
      <noscript>
        <style>{`#site-preloader{display:none!important}`}</style>
      </noscript>
      <SitePreloader />
      <LandingSwitch />
    </>
  );
}
