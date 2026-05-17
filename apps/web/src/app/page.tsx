import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FocusCards from "@/components/FocusCards";
import Atlas from "@/components/Atlas";
import LiveWire from "@/components/LiveWire";
import DevSection from "@/components/DevSection";
import Footer from "@/components/Footer";
import DistrictModal from "@/components/DistrictModal";

export default function Home() {
  return (
    <>
      <DistrictModal />
      <Header />
      <main>
        <Hero />
        <FocusCards />
        <Atlas />
        <LiveWire />
        <DevSection />
      </main>
      <Footer />
    </>
  );
}
