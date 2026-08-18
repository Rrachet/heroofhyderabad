import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, X, Play, ChevronDown } from 'lucide-react';
import './styles.css';

const cats = [
  'Inspirational Heroes', 'Heroes of HR', 'Social Impact', 'Arts & Culture',
  'Technology & Innovation', 'Education & Academia', 'Philanthropy',
  'Sustainability', 'Healthcare', 'Business & Leadership', 'Public Service',
  'Young Achievers', 'Unsung Heroes'
];

const jury = [
  ['Jaikrishna B. (J.K.)', 'President & Group CHRO', 'Amara Raja Group', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85'],
  ['Rajesh Dhuddu', 'Blockchain & Cybersecurity Leader', 'PwC India', 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?auto=format&fit=crop&w=900&q=85'],
  ['Pratyusha Sharma', 'HR Head', 'Invesco', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85'],
  ['Meraj Faheem', 'CEO', 'Telangana Innovation Cell', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85'],
  ['Debashish Ghosh', 'Entrepreneur', 'Independent', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85']
];

const heroVideos = [
  'https://www.youtube.com/embed/HXwT8EF0pio?autoplay=1&mute=1&controls=0&loop=1&playlist=HXwT8EF0pio&modestbranding=1&playsinline=1&rel=0',
  'https://www.youtube.com/embed/rfcBEHGkA8s?autoplay=1&mute=1&controls=0&loop=1&playlist=rfcBEHGkA8s&modestbranding=1&playsinline=1&rel=0'
];

// The Charminar illustration used in the Canva HOHYD identity.
const canvaCharminar = 'https://media-public.canva.com/FrrAU/MAFZ0QFrrAU/1/t.png';

const charminarPhotos = {
  wide: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charminar%20in%20Hyderabad,%20India.jpg?width=1800',
  portrait: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charminar,%20Hyderabad,%20AP.jpg?width=1200',
  evening: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charminar%20of%20Hyderabad%20Telangana.jpg?width=1600'
};

function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVideo, setHeroVideo] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroVideo(v => (v + 1) % heroVideos.length), 10000);
    return () => window.clearInterval(timer);
  }, []);

  const go = id => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className={scrolled ? 'header scrolled' : 'header'}>
        <button className="brand" onClick={() => go('home')} aria-label="Heroes of Hyderabad home">
          <span className="brandLogo">
            <span>HO</span>
            <img src={canvaCharminar} alt="Charminar" />
            <span>YD</span>
          </span>
          <span className="brandSub">HEROES OF HYDERABAD</span>
        </button>

        <nav>
          {[
            ['about', 'About'],
            ['categories', 'Categories'],
            ['jury', 'Jury'],
            ['gallery', 'Moments']
          ].map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <button className="navCta" onClick={() => setModal(true)}>
          Nominate <ArrowUpRight size={15} />
        </button>
        <button className="hamb" onClick={() => setMenu(!menu)} aria-label="Open menu">
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      {menu && (
        <div className="mobileNav">
          {[
            ['about', 'About'],
            ['categories', 'Categories'],
            ['jury', 'Jury'],
            ['gallery', 'Moments']
          ].map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
          <button onClick={() => setModal(true)}>Nominate a Hero</button>
        </div>
      )}

      <main>
        <section id="home" className="hero">
          <div className="heroVideoStack" aria-hidden="true">
            {heroVideos.map((src, index) => (
              <iframe
                key={src}
                className={index === heroVideo ? 'active' : ''}
                title={`Charminar cinematic view ${index + 1}`}
                src={src}
                allow="autoplay; encrypted-media; picture-in-picture"
              />
            ))}
          </div>
          <div className="heroShade" />
          <div className="heroContent">
            <p className="presenter">TRIUMPHS OF TALENT PRESENTS</p>
            <div className="heroLogo">
              <span>HO</span>
              <img src={canvaCharminar} alt="Charminar" />
              <span>YD</span>
            </div>
            <h1>HEROES <small>OF</small> HYDERABAD</h1>
            <p className="heroIntro">Celebrating the people who make Hyderabad what it is.</p>
            <div className="heroActions">
              <button className="goldBtn" onClick={() => setModal(true)}>Nominate a Hero <ArrowUpRight size={17} /></button>
              <button className="watchBtn" onClick={() => setVideoOpen(true)}>
                <span><Play size={13} fill="currentColor" /></span> Watch the story
              </button>
            </div>
          </div>
          <div className="heroFooter">
            <span>HYDERABAD · TELANGANA · INDIA</span>
            <span>2026</span>
          </div>
          <button className="discover" onClick={() => go('about')}>Scroll to explore <ChevronDown size={15} /></button>
        </section>

        <section id="about" className="intro section">
          <div className="introCopy">
            <p className="label">ABOUT HEROES OF HYDERABAD</p>
            <h2>A CITY IS<br /><em>REMEMBERED</em><br />BY ITS PEOPLE.</h2>
            <p className="lead">Heroes of Hyderabad recognises people whose work, courage and contribution have made a difference to the city and the people around them.</p>
            <div className="stats">
              <div><strong>75+</strong><span>PEOPLE<br />CELEBRATED</span></div>
              <div><strong>13</strong><span>CATEGORIES<br />OF RECOGNITION</span></div>
              <div><strong>1</strong><span>CITY<br />MANY STORIES</span></div>
            </div>
            <button className="textLink" onClick={() => setModal(true)}>Nominate someone <ArrowUpRight size={16} /></button>
          </div>
        </section>

        <section className="charminarStory">
          <div className="charminarImage" style={{ backgroundImage: `url(${charminarPhotos.wide})` }} />
          <div className="charminarCopy">
            <p className="label light">THE CITY BEGINS HERE</p>
            <h2>FROM THE<br /><em>CHARMINAR</em><br />OUTWARD.</h2>
            <p>Charminar has watched Hyderabad change for centuries. Around it, people have built businesses, communities, careers and lives that keep the city moving.</p>
            <span className="photoCredit">CHARMINAR · HYDERABAD</span>
          </div>
        </section>

        <section id="categories" className="categories section">
          <div className="sectionHead">
            <p className="label">THE CATEGORIES</p>
            <h2>13 WAYS TO<br /><em>MAKE A DIFFERENCE.</em></h2>
          </div>
          <div className="catGrid">
            {cats.map((cat, i) => (
              <button className="cat" key={cat}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{cat}</strong>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </section>

        <section id="jury" className="jury section">
          <div className="sectionHead">
            <p className="label">THE JURY</p>
            <h2>PEOPLE WHO<br /><em>KNOW THE CITY.</em></h2>
          </div>
          <div className="juryGrid">
            {jury.map(([name, role, org, img]) => (
              <article className="juryCard" key={name}>
                <div className="portrait"><img src={img} alt={name} /></div>
                <h3>{name}</h3>
                <p>{role}</p>
                <small>{org}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="cityStrip">
          <div className="cityStripImage" style={{ backgroundImage: `url(${charminarPhotos.portrait})` }} />
          <div className="cityStripCopy">
            <p className="label light">HYDERABAD</p>
            <h2>OLD STREETS.<br /><em>NEW STORIES.</em></h2>
            <p>There is more than one way to leave a mark.</p>
          </div>
        </section>

        <section id="gallery" className="gallery section">
          <div className="sectionHead">
            <p className="label">MOMENTS</p>
            <h2>THE PEOPLE.<br /><em>THE NIGHT.</em></h2>
          </div>
          <div className="galleryGrid">
            <div className="galleryTile tileA" />
            <div className="galleryTile tileB" />
            <div className="galleryTile tileC" />
            <div className="galleryTile tileD" />
          </div>
        </section>

        <section className="finalCta">
          <div>
            <p className="label">KNOW A HERO?</p>
            <h2>PUT THEIR<br /><em>NAME FORWARD.</em></h2>
            <p>Tell us about someone in Hyderabad whose story deserves to be heard.</p>
            <button className="goldBtn" onClick={() => setModal(true)}>Start a nomination <ArrowUpRight size={17} /></button>
          </div>
        </section>
      </main>

      <footer>
        <div className="footerBrand">
          <div className="footerLogo">
            <span>HO</span><img src={canvaCharminar} alt="Charminar" /><span>YD</span>
          </div>
          <p>Heroes of Hyderabad</p>
          <small>An initiative by Triumphs of Talent</small>
        </div>
        <div className="footLinks">
          <button onClick={() => go('about')}>About</button>
          <button onClick={() => go('categories')}>Categories</button>
          <button onClick={() => go('jury')}>Jury</button>
          <button onClick={() => go('gallery')}>Moments</button>
        </div>
        <div className="footerMeta">HYDERABAD · INDIA<br /><span>© 2026 TRIUMPHS OF TALENT</span></div>
      </footer>

      {modal && (
        <div className="overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setModal(false)}><X /></button>
            <p className="label">HEROES OF HYDERABAD</p>
            <h2>NOMINATE A<br /><em>HERO.</em></h2>
            <p>Tell us about someone whose work or contribution deserves recognition.</p>
            <form onSubmit={e => { e.preventDefault(); setModal(false); alert('Thank you! Your nomination has been recorded.'); }}>
              <input placeholder="Your name" required />
              <input placeholder="Email address" type="email" required />
              <input placeholder="Nominee name" required />
              <input placeholder="Organisation / designation" />
              <select defaultValue="" required>
                <option value="" disabled>Select category</option>
                {cats.map(cat => <option key={cat}>{cat}</option>)}
              </select>
              <textarea placeholder="Tell us why this person should be recognised." rows="5" required />
              <button className="goldBtn" type="submit">Submit nomination <ArrowUpRight size={17} /></button>
            </form>
          </div>
        </div>
      )}

      {videoOpen && (
        <div className="overlay" onClick={() => setVideoOpen(false)}>
          <div className="videoModal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setVideoOpen(false)}><X /></button>
            <iframe title="Heroes of Hyderabad story" src={heroVideos[heroVideo].replace('controls=0', 'controls=1')} allow="autoplay; encrypted-media; picture-in-picture" />
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
