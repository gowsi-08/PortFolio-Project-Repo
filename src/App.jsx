import { useState, useEffect } from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CodingPlatforms from './components/CodingPlatforms';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';

export default function App() {
  const data = usePortfolioData();
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Guard: YAML not loaded
  if (!data || !data.personal) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        color: '#6B7585',
        fontSize: '0.9rem',
        background: '#F7F8FA',
      }}>
        Loading portfolio…
      </div>
    );
  }

  // Admin panel at /#admin
  if (isAdmin) {
    const password = data.contact?.admin_password || 'admin123';
    return <Admin password={password} />;
  }

  return (
    <>
      <Navbar name={data.personal.name} />
      <main>
        <Hero data={data} />
        <About data={data} />
        <Skills data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <CodingPlatforms data={data} />
        <Achievements data={data} />
        <Education data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </>
  );
}
