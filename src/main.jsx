import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import './styles.css';

const HOHYD_LOGO = '__HOHYD_LOGO__';
const TOT_LOGO = '__TOT_LOGO__';

const categories = [
  'Inspirational Heroes', 'Heroes of HR', 'Social Impact', 'Arts & Culture',
  'Technology & Innovation', 'Education & Academia', 'Philanthropy',
  'Sustainability', 'Healthcare', 'Business & Leadership', 'Public Service',
  'Young Achievers', 'Unsung Heroes'
];

const jury = [
  ['Jai Krishna B. (J.K.)', 'President & Group CHRO', 'Amara Raja Group'],
  ['Rajesh Dhuddu', 'Blockchain & Cybersecurity Leader', 'PwC'],
  ['Pratyusha Sharma', 'HR Head', 'Invesco'],
  ['Meraj Faheem', 'CEO', 'Telangana Innovation Cell (TGIC)'],
  ['Debashish Ghosh', 'Entrepreneur', 'Independent']
];

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('hohyd-theme') || 'dark');
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('hohyd-theme', theme);
  }, [theme]);

  const go = id => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => setTheme(current => current === 'dark' ? 'light' : 'dark');

  return (
    <div className="site">
      <header className="siteHeader">
        <button className="miniBrand" onClick={() => go('home')} aria-label="Heroes of Hyderabad home">
          <img src={HOHYD_LOGO} alt="Heroes of Hyderabad" />
        </button>

        <nav className={menu ? 'nav open' : 'nav'}>
          <button onClick={() => go('about')}>About</button>
          <button onClick={() => go('categories')}>Categories</button>
          <button onClick={() => go('jury')}>Jury</button>
          <button onClick={() => setModal(true)}>Nominate</button>
        </nav>

        <div className="headerActions">
          <button className="themeButton" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="headerCta" onClick={() => setModal(true)}>Nominate <ArrowUpRight size={15} /></button>
          <button className="menuButton" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="heroInner">
            <p className="eyebrow">Triumphs of Talent presents</p>
            <img className="heroLogo" src={HOHYD_LOGO} alt="Heroes of Hyderabad 2025" />
            <p className="heroText">Recognising the people whose work, leadership and contribution are shaping Hyderabad.</p>
            <button className="primaryButton" onClick={() => setModal(true)}>Nominate a Hero <ArrowUpRight size={16} /></button>
          </div>
          <div className="heroBottom"><span>HYDERABAD · TELANGANA</span><span>2025</span></div>
        </section>

        <section id="about" className="about section">
          <div className="sectionIntro">
            <p className="eyebrow">About Heroes of Hyderabad</p>
            <h1>Celebrating the people<br /><span>behind the city.</span></h1>
          </div>
          <div className="aboutGrid">
            <p className="largeCopy">Hyderabad is built by people who lead, create, serve, teach, build and give back. Heroes of Hyderabad brings those stories to the forefront.</p>
            <div className="bodyCopy">
              <p>The platform recognises achievers and changemakers across industries and communities, giving deserving people a stage based on their work and impact.</p>
              <p>Selections are jury-driven, with a focus on achievement, contribution and the difference a person has made.</p>
            </div>
          </div>
          <div className="numbers">
            <div><strong>75+</strong><span>ACHIEVERS<br />RECOGNISED</span></div>
            <div><strong>13</strong><span>RECOGNITION<br />CATEGORIES</span></div>
            <div><strong>1</strong><span>CITY<br />HYDERABAD</span></div>
          </div>
        </section>

        <section id="categories" className="categories section">
          <div className="sectionTop">
            <div>
              <p className="eyebrow">Recognition categories</p>
              <h2>Find the story<br /><span>worth recognising.</span></h2>
            </div>
            <p className="sideNote">From technology and business to arts, public service and social impact, the categories reflect the many ways people contribute to Hyderabad.</p>
          </div>
          <div className="categoryList">
            {categories.map(category => (
              <button className="categoryRow" key={category} onClick={() => setModal(true)}>
                <span>{category}</span><ArrowUpRight size={17} />
              </button>
            ))}
          </div>
        </section>

        <section id="jury" className="jury section">
          <div className="sectionTop">
            <div>
              <p className="eyebrow">The jury</p>
              <h2>Recognition<br /><span>with credibility.</span></h2>
            </div>
            <p className="sideNote">A panel of experienced leaders evaluates nominations and helps identify stories that deserve the spotlight.</p>
          </div>
          <div className="juryList">
            {jury.map(([name, role, organisation]) => (
              <article key={name} className="juryRow">
                <div className="juryName">{name}</div>
                <div className="juryRole">{role}</div>
                <div className="juryOrg">{organisation}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="nominate section">
          <div className="nominateInner">
            <img className="totLogo" src={TOT_LOGO} alt="Triumphs of Talent" />
            <div>
              <p className="eyebrow">Know a Hero?</p>
              <h2>Put their<br /><span>name forward.</span></h2>
              <p>Tell us about someone whose work deserves recognition.</p>
              <button className="primaryButton" onClick={() => setModal(true)}>Nominate a Hero <ArrowUpRight size={16} /></button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footerBrand"><img src={HOHYD_LOGO} alt="Heroes of Hyderabad" /><p>An initiative by Triumphs of Talent.</p></div>
        <div className="footerLinks">
          <button onClick={() => go('about')}>About</button>
          <button onClick={() => go('categories')}>Categories</button>
          <button onClick={() => go('jury')}>Jury</button>
          <button onClick={() => setModal(true)}>Nominate</button>
        </div>
        <div className="footerMeta">HYDERABAD · INDIA<br />© 2025 TRIUMPHS OF TALENT</div>
      </footer>

      <div className="themeDock">
        <button onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {modal && (
        <div className="overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setModal(false)}><X /></button>
            <p className="eyebrow">Heroes of Hyderabad</p>
            <h2>Nominate a<br /><span>Hero.</span></h2>
            <p>Share the details of someone whose contribution deserves recognition.</p>
            <form onSubmit={e => { e.preventDefault(); setModal(false); alert('Thank you for your nomination.'); }}>
              <input required placeholder="Your name" />
              <input required type="email" placeholder="Email address" />
              <input required placeholder="Nominee name" />
              <input placeholder="Organisation / designation" />
              <select required defaultValue=""><option value="" disabled>Select category</option>{categories.map(c => <option key={c}>{c}</option>)}</select>
              <textarea required rows="5" placeholder="Why should this person be recognised?" />
              <button className="primaryButton" type="submit">Submit nomination <ArrowUpRight size={16} /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
