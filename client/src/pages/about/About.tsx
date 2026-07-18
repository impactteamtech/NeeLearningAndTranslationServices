import AboutHero from "../../components/about-page-components/AboutHero";
import AboutStory from "../../components/about-page-components/AboutStory";
import AboutFounder from "../../components/about-page-components/AboutFounder";
import AboutValues from "../../components/about-page-components/AboutValues";
import AboutCTA from "../../components/about-page-components/AboutCTA";

export const About = () => {
  return (
    <main className="flex flex-col gap-10">
      <AboutHero />
      <AboutStory />
      <AboutFounder />
      <AboutValues />
      <AboutCTA />
    </main>
  );
};

export default About;
