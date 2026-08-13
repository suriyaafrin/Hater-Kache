import Hero from "../components/home/Hero";
import TrustStats from "../components/home/TrustStats";
import Categories from "../components/home/Categories";
import NearYou from "../components/home/NearYou";
import {
  AssistantTeaser,
  EmergencyStrip,
  HowItWorks,
  NearbyMap,
  ProJoinCta,
  Protection,
  Testimonials,
} from "../components/home/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <Categories />
      <NearYou />
      <HowItWorks />
      <NearbyMap />
      <AssistantTeaser />
      <EmergencyStrip />
      <Protection />
      <Testimonials />
      <ProJoinCta />
    </>
  );
}
