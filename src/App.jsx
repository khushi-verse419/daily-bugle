import React, { useMemo, useState } from 'react';

const stories = [
  { id: 1, category: 'CITY ALERT', time: '8 min ago', title: 'Five-Minute Blackout Leaves Manhattan Asking One Question', summary: 'Every screen in the city went dark at exactly 9:17 p.m. Then a strange red signal appeared above the skyline.', author: 'M. Jameson', label: 'TOP STORY', body: 'At exactly 9:17 p.m., lights flickered across several Manhattan blocks. Phones, billboards, and traffic displays briefly went dark before a red pulse appeared over the rooftops. Officials say the outage is under investigation. Residents reported seeing a figure move between buildings moments before power returned.' },
  { id: 2, category: 'SPIDER WATCH', time: '24 min ago', title: "The Web-Slinger's Impossible Choice", summary: 'A dramatic rescue has left witnesses debating what the masked hero should have done next.', author: 'N. Watson', label: 'EXCLUSIVE', body: 'Witnesses near the Queensboro Bridge described a confusing scene involving a stalled bus and a damaged traffic signal. A masked figure helped people reach safety before disappearing. The Daily Bugle has not independently confirmed the identity of the person involved.' },
  { id: 3, category: 'INVESTIGATION',time: '41 min ago', title: 'The Laboratory That Never Existed', summary: 'A missing building number and a locked rooftop door have sparked a neighbourhood mystery.', author: 'B. Leeds', label: 'DEEP DIVE', body: 'Residents of a Midtown block say contractors entered an empty building for weeks, yet city records show no active laboratory at the address. Officials have not commented. Our team is checking public records and speaking with nearby businesses.' },
  { id: 4, category: 'SCIENCE',time: '1 hr ago', title: 'A Signal from Another New York?', summary: 'Amateur radio operators picked up a repeating message that does not match any known city broadcast.', author: 'F. Foswell', label: 'NEW', body: 'Radio hobbyists reported a repeating sequence of tones late last night. Some believe it may be interference, while others are comparing recordings to identify the source. Experts caution that unusual signals can have ordinary technical explanations.' },
  { id: 5, category: 'QUEENS', time: '2 hrs ago', title: 'Green Light Seen Above Queens Rooftops', summary: 'Residents share photos of a mysterious glow, but the source remains unknown.', author: 'R. Robertson', label: 'TRENDING', body: 'Several residents reported a green glow above the rooftops shortly after sunset. Photos shared with the newsroom show a bright light reflected in low clouds. Weather conditions, construction lighting, and other sources are being investigated.' },
  { id: 6, category: 'CULTURE', time: '3 hrs ago', title: 'Who Left the Message on the Water Tower?', summary: 'A simple spider symbol has turned into the city’s most debated piece of street art.', author: 'G. Stacy', label: 'CITY LIFE', body: 'A freshly painted symbol on a water tower has drawn curious crowds and sparked online theories. Local artists say the image may simply be a tribute to the city’s love of superheroes. The property owner has not yet announced whether it will remain.' },
  { id: 7, category: 'TECHNOLOGY',time: '4 hrs ago', title: 'Robot on Test Run Appears to Recognise Spider-Man', summary: 'A robotics demonstration took an unexpected turn when its prototype changed direction mid-test.', author: 'H. Hogan', label: 'TECH', body: 'During a public robotics demonstration, a prototype suddenly turned toward a passing figure in a red-and-blue suit. Engineers say the robot was running object-detection software and that more testing is needed before drawing conclusions.' },
  { id: 8, category: 'OPINION',time: '5 hrs ago', title: 'The Spider Symbol Conspiracy: Facts or Fiction?', summary: 'Our newsroom separates the evidence from the rumours spreading across social media.', author: 'J. Jonah Jameson', label: 'OPINION', body: 'A symbol, a power cut, and a few blurry photographs have fuelled a wave of speculation. Before accepting any theory, readers should ask what has been verified, what remains uncertain, and whether an ordinary explanation fits the evidence.' },
];
const categories = ['ALL', ...new Set(stories.map((story) => story.category))];

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dailyBugleSaved') || '[]'); } catch { return []; }
  });
  const [current, setCurrent] = useState(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [dark, setDark] = useState(true);

  function toggleSaved(id) {
    setSaved((old) => {
      const next = old.includes(id) ? old.filter((item) => item !== id) : [...old, id];
      localStorage.setItem('dailyBugleSaved', JSON.stringify(next));
      return next;
    });
  }

  const filtered = useMemo(() => stories.filter((story) => {
    const matchesSearch = `${story.title} ${story.summary} ${story.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'ALL' || story.category === category;
    const matchesSaved = !savedOnly || saved.includes(story.id);
    return matchesSearch && matchesCategory && matchesSaved;
  }), [search, category, saved, savedOnly]);

  return (
    <div className={dark ? 'app' : 'app light'}>
      <div className="topline">NEW YORK CITY'S MOST UNRELIABLE SOURCE OF RELIABLE FICTION <span>● LIVE UPDATES</span></div>
      <header className="masthead">
        <button className="menu-button" onClick={() => { setCurrent(null); setSavedOnly(false); }}>☰ <span>MENU</span></button>
        <div className="brand" onClick={() => { setCurrent(null); setSavedOnly(false); }} role="button" tabIndex="0">
          <div className="brand-small">THE NEW YORK</div><div className="brand-name">DAILY BUGLE</div><div className="brand-tag">SPIDER SIGNAL FILES • EST. 1932</div>
        </div>
        <button className="theme-button" onClick={() => setDark(!dark)}>{dark ? '☼ LIGHT' : '☾ DARK'}</button>
      </header>
      <nav className="nav-row"><span>BREAKING</span><span>NEW YORK</span><span>SPIDER WATCH</span><span>SCIENCE</span><span>INVESTIGATIONS</span><span>OPINION</span></nav>
      <main>
        {current ? (
          <article className="article-view">
            <button className="back-button" onClick={() => setCurrent(null)}>← BACK TO FRONT PAGE</button>
            <p className="eyebrow">{current.category} · {current.time}</p>
            <h1>{current.title}</h1><p className="article-summary">{current.summary}</p><p className="byline">BY {current.author.toUpperCase()} · DAILY BUGLE NEWSROOM</p>
            <div className="article-art"><span>DB</span><b>THE CITY NEVER<br/>STOPS WATCHING.</b></div>
            <p className="article-body">{current.body}</p><p className="fiction-note">This is an original fictional story created for a student web-development project.</p>
            <button className="save-button" onClick={() => toggleSaved(current.id)}>{saved.includes(current.id) ? '★ SAVED FOR LATER' : '☆ SAVE FOR LATER'}</button>
          </article>
        ) : (
          <>
            <section className="hero">
              <div className="hero-copy"><p className="eyebrow">THE CITY IS WATCHING · SPECIAL REPORT</p><h1>THE TRUTH IS<br/><em>OUT THERE.</em></h1><p>Eight stories. One city. A thousand unanswered questions. Follow the signals hiding in plain sight across New York.</p><button onClick={() => setCurrent(stories[0])}>READ THE TOP STORY ↗</button></div>
              <div className="hero-graphic"><div className="moon"></div><div className="web web-one"></div><div className="web web-two"></div><div className="city-silhouette"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="graphic-caption">ISSUE NO. 008 <span>NYC / 11:47 PM</span></div></div>
            </section>
            <div className="section-heading"><div><p className="eyebrow">THE LATEST DISPATCHES</p><h2>{savedOnly ? 'SAVED STORIES' : 'LATEST STORIES'} <span>({filtered.length.toString().padStart(2, '0')})</span></h2></div><button className="saved-toggle" onClick={() => setSavedOnly(!savedOnly)}>{savedOnly ? '← ALL STORIES' : `★ SAVED (${saved.length})`}</button></div>
            <section className="filters"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search stories..." aria-label="Search stories"/><div className="category-list">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></section>
            <section className="story-grid">{filtered.map((story, index) => <article className={`story-card card-${index % 4}`} key={story.id}><button className="story-art" onClick={() => setCurrent(story)} aria-label={`Read ${story.title}`}><span className="art-index">DB / 00{story.id}</span><strong>{['SIGNAL<br/>LOST','THE<br/>WATCHER','UNKNOWN<br/>ADDRESS','BEYOND<br/>THE CITY'][index % 4].split('<br/>').map((part, i) => <React.Fragment key={part}>{i > 0 && <br/>}{part}</React.Fragment>)}</strong><span className="art-stamp">{story.label}</span></button><div className="story-content"><div className="story-meta"><span>{story.category}</span><span>{story.time}</span></div><h3><button onClick={() => setCurrent(story)}>{story.title}</button></h3><p>{story.summary}</p><div className="story-bottom"><span>BY {story.author.toUpperCase()}</span><button onClick={() => toggleSaved(story.id)} aria-label={saved.includes(story.id) ? 'Remove saved story' : 'Save story'}>{saved.includes(story.id) ? '★' : '☆'}</button></div></div></article>)}</section>
            {filtered.length === 0 && <div className="empty-state">NO STORIES FOUND. TRY ANOTHER SEARCH.</div>}
          </>
        )}
      </main>
      <footer><div className="footer-brand">THE DAILY BUGLE</div><p>NEW YORK. EVERY STORY MATTERS.</p><small>All stories on this student project are fictional and created for demonstration purposes.</small></footer>
    </div>
  );
}
