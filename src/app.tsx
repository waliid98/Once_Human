import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Features } from "@/components/Scenario";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Restrictions } from "@/components/restrictions";
import { Story } from "@/components/story";

const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Features />
        <Story />
        <Restrictions />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};
export default App;
