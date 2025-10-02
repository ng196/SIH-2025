import { useMemo, useState } from 'react';
import Quiz from './Quiz';
import './Arena.css';

const SUBJECTS = [
  { id: 'mathematics', name: 'Mathematics', topics: [
    { id: 'math_algebra_01', name: 'Algebra Basics' },
  ]},
  { id: 'physics', name: 'Physics', topics: [
    { id: 'phy_8_gravity_01', name: 'Forces & Motion' },
  ]}
];

// localStorage helpers for prototype best scores
const bestKey = (mode, topicId) => `arena.best.${mode}.${topicId}`;
const getBest = (mode, topicId) => {
  try { return parseInt(localStorage.getItem(bestKey(mode, topicId)) || '0', 10); } catch {
    // ignore
    return 0;
  }
};
const setBest = (mode, topicId, scorePct) => {
  try {
    const current = getBest(mode, topicId);
    if (scorePct > current) localStorage.setItem(bestKey(mode, topicId), String(scorePct));
  } catch {
    // ignore
  }
};

// Modes: single, random, rapid, multiplayer (stub), team (stub)
export default function Arena() {
  const [mode, setMode] = useState('single');
  const [subject, setSubject] = useState('mathematics');
  const topics = useMemo(() => SUBJECTS.find(s => s.id === subject)?.topics || [], [subject]);
  const [topicId, setTopicId] = useState('math_algebra_01');
  const [start, setStart] = useState(false);
  const [seed, setSeed] = useState(0);

  const onStart = (selectedMode) => {
    if (selectedMode) setMode(selectedMode);
    setSeed(s => s + 1); // force remount
    setStart(true);
  };

  const onQuizComplete = (res) => {
    setStart(false);
    const pct = Math.round(res.percentage);
    setBest(mode, topicId, pct);
    alert(`Score: ${res.score}/${res.total} ( ${pct}% )`);
  };

  const best = getBest(mode, topicId);

  return (
    <div className="arena-container">
      <div className="arena-content">
        {/* Hero */}
        <div className="arena-hero">
          <div className="arena-hero-content">
            <div className="arena-hero-text">
              <h1>🎮 Arena</h1>
              <p>Single-player, random, and rapid-fire rounds for quick demos. Multiplayer coming soon.</p>
            </div>
            <div className="arena-best-score">
              <div className="arena-best-score-label">Best ({mode})</div>
              <div className="arena-best-score-value">{best}%</div>
            </div>
          </div>
        </div>

        {/* Controls + Samples */}
        {!start && (
          <div className="arena-controls-container">
            {/* Left: selectors */}
            <div className="arena-controls">
              <div className="arena-control-group">
                <label className="arena-control-label">Subject</label>
                <select value={subject} onChange={e=>{ setSubject(e.target.value); const first=SUBJECTS.find(s=>s.id===e.target.value)?.topics?.[0]?.id; if(first) setTopicId(first); }} className="arena-select">
                  {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="arena-control-group">
                <label className="arena-control-label">Topic</label>
                <select value={topicId} onChange={e=>setTopicId(e.target.value)} className="arena-select">
                  {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              <div className="arena-control-group">
                <label className="arena-control-label">Mode</label>
                <div className="arena-mode-grid">
                  {[
                    { id: 'single', label: '🎯 Single' },
                    { id: 'random', label: '🔀 Random' },
                    { id: 'rapid', label: '⚡ Rapid' },
                    { id: 'multiplayer', label: '👥 Multi (Soon)' },
                    { id: 'team', label: '🛡️ Team (Soon)' },
                  ].map((m) => (
                    <button 
                      key={m.id} 
                      onClick={()=>setMode(m.id)} 
                      className={`arena-mode-btn ${mode===m.id ? 'active' : ''} ${(m.id === 'multiplayer' || m.id === 'team') ? 'disabled' : ''}`}
                      disabled={m.id === 'multiplayer' || m.id === 'team'}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="arena-control-group">
                <button onClick={()=>onStart()} className="arena-start-btn">Start</button>
              </div>
            </div>

            {/* Right: sample rounds */}
            <div className="arena-samples-grid">
              <SampleCard
                title="Quick Quiz"
                subtitle="5 Q • Single Player"
                desc="A straightforward round to warm up."
                actionLabel="Play"
                onClick={()=>onStart('single')}
              />
              <SampleCard
                title="Random Mix"
                subtitle="5 Q • Random Order"
                desc="Shuffled questions for variety."
                actionLabel="Shuffle"
                onClick={()=>onStart('random')}
              />
              <SampleCard
                title="Rapid Fire"
                subtitle="10s/question"
                desc="Beat the clock for every question."
                actionLabel="Go Fast"
                onClick={()=>onStart('rapid')}
              />
              <div className="arena-coming-soon-card">
                <div className="arena-coming-soon-header">
                  <div>
                    <h3>👥 Multiplayer</h3>
                    <p>Create room, share code, and compete. Coming soon.</p>
                  </div>
                  <span className="arena-coming-soon-badge">Soon</span>
                </div>
                <div className="arena-coming-soon-actions">
                  <button disabled className="arena-coming-soon-btn">Create Room</button>
                  <button disabled className="arena-coming-soon-btn">Join with Code</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Area */}
        {start && (
          <div key={seed} className="mt-4">
            <ArenaQuizWrapper mode={mode} topicId={topicId} onComplete={onQuizComplete} onExit={()=>setStart(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

function SampleCard({ title, subtitle, desc, actionLabel, onClick }) {
  return (
    <div className="arena-sample-card">
      <h3>{title}</h3>
      <div className="arena-sample-card-subtitle">{subtitle}</div>
      <p className="arena-sample-card-desc">{desc}</p>
      <div className="arena-sample-card-action">
        <button onClick={onClick} className="arena-sample-card-btn">{actionLabel}</button>
      </div>
    </div>
  );
}

function ArenaQuizWrapper({ mode, topicId, onComplete, onExit }) {
  // Pass mode to Quiz; Quiz handles random and rapid behavior
  return (
    <Quiz topicId={topicId} onQuizComplete={onComplete} onBack={onExit} mode={mode} />
  );
}
