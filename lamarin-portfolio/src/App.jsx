import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import HowItWorks  from './components/HowItWorks'
import Services    from './components/Services'
import CVTailoring from './components/CVTailoring'
import SampleOutput from './components/SampleOutput'
import WhyLamarIn  from './components/WhyLamarIn'
import Pricing     from './components/Pricing'
import CtaSection  from './components/CtaSection'
import Footer      from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <CVTailoring />
        <SampleOutput />
        <WhyLamarIn />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
