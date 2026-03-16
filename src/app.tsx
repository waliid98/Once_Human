import { Suspense, lazy } from "react";

import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";

const About = lazy(() => import("@/components/about").then((m) => ({ default: m.About })));
const Features = lazy(() => import("@/components/Scenario").then((m) => ({ default: m.Features })));
const Story = lazy(() => import("@/components/story").then((m) => ({ default: m.Story })));
const Restrictions = lazy(() =>
  import("@/components/restrictions").then((m) => ({ default: m.Restrictions }))
);
const Contact = lazy(() => import("@/components/contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/footer").then((m) => ({ default: m.Footer })));

const App = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Features />
          <Story />
          <Restrictions />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};
export default App;
