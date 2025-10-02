import { useMemo, useState } from 'react';

export default function ClassDetail({ classMeta, onBack, onOpenDiscussion, onNavigate }) {
  const [tab, setTab] = useState('overview');

  const sample = useMemo(() => ({
    overview: {
      announcement: 'Welcome to the new term! Please review the lab safety rules before Friday.',
      nextClass: classMeta?.nextClass || 'Mon, 10:00 AM • Lab session',
      progress: classMeta?.progress || 62,
      totalStudents: classMeta?.studentCount || 28,
      schedule: classMeta?.schedule || 'Mon, Wed, Fri 10:00 AM',
      room: classMeta?.room || 'Room 305',
    },
    assignments: [
      { id: 'a1', title: 'Wave Lab Report', due: 'Fri, 5 PM', status: 'Pending', points: 20 },
      { id: 'a2', title: 'Forces Worksheet', due: 'Sep 28', status: 'Submitted', points: 15 },
      { id: 'a3', title: 'Project Proposal', due: 'Oct 5', status: 'Assigned', points: 30 },
    ],
    tests: [
      { id: 't1', title: 'Waves Quiz', duration: '10 min', type: 'MCQ', status: 'Available' },
      { id: 't2', title: 'Forces Checkpoint', duration: '15 min', type: 'MCQ', status: 'Locked' },
    ],
    resources: [
      { id: 'r1', title: 'Lab Safety PDF', type: 'PDF', size: '1.2 MB' },
      { id: 'r2', title: 'Wave Simulation Link', type: 'Link', size: '' },
      { id: 'r3', title: 'Lecture Slides - Forces', type: 'Slides', size: '3.5 MB' },
    ],
    members: {
      teacher: classMeta?.teacher || classMeta?.owner || 'Instructor',
      students:  Array.from({ length: Math.min( (classMeta?.studentCount || 18), 18) }).map((_, i) => ({ id: `s${i}`, name: `Student ${i+1}`})),
    }
  }), [classMeta]);

  const SubjectBadge = ({ subject }) => {
    const map = {
      physics: { icon: '⚛️', color: 'blue-600', bgColor: 'blue-50' },
      chemistry: { icon: '🧪', color: 'green-600', bgColor: 'green-50' },
      biology: { icon: '🧬', color: 'purple-600', bgColor: 'purple-50' },
      math: { icon: '🧮', color: 'orange-600', bgColor: 'orange-50' },
      mathematics: { icon: '🧮', color: 'orange-600', bgColor: 'orange-50' },
    };
    const m = map[subject] || { icon: '📚', color: 'gray-600', bgColor: 'gray-50' };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-${m.bgColor} text-${m.color} text-xs font-medium`}>
        <span>{m.icon}</span>
        <span>{subject ? subject[0].toUpperCase()+subject.slice(1) : 'General'}</span>
      </span>
    );
  };

  const ActionBar = () => (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => setTab('assignments')} className="px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0055A4', minHeight: '44px' }}>New Assignment</button>
      <button onClick={() => setTab('tests')} className="px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0077B6', minHeight: '44px' }}>Start Test</button>
      <button onClick={() => onOpenDiscussion?.()} className="px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0077B6', minHeight: '44px' }}>Discussion</button>
      <button onClick={() => setTab('resources')} className="px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#4CAF50', minHeight: '44px' }}>Resources</button>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <header className="theme-card shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-600 hover:opacity-70 font-medium">← Back</button>
            <div>
              <h1 className="text-xl font-bold theme-text">{classMeta?.name || 'Classroom'}</h1>
              <div className="text-sm flex items-center gap-2" style={{ color: '#757575' }}>
                <SubjectBadge subject={classMeta?.subject} />
                {classMeta?.from === 'teacher' && classMeta?.teacher && (
                  <span>• {classMeta.teacher} • {classMeta.studentCount || 0} students</span>
                )}
                {classMeta?.from === 'student' && classMeta?.owner && (
                  <span>• by {classMeta.owner} • {classMeta.studentCount || 1} members</span>
                )}
                {sample.overview.schedule && (
                  <span>• {sample.overview.schedule}</span>
                )}
                {sample.overview.room && (
                  <span>• {sample.overview.room}</span>
                )}
              </div>
            </div>
          </div>
          <ActionBar />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'assignments', label: 'Assignments' },
            { id: 'tests', label: 'Tests' },
            { id: 'resources', label: 'Resources' },
            { id: 'members', label: 'Members' },
            { id: 'discussion', label: 'Discussion' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => t.id === 'discussion' ? onOpenDiscussion?.() : setTab(t.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                tab === t.id 
                  ? 'text-white border-transparent shadow-sm' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              style={tab === t.id ? { backgroundColor: '#0055A4', minHeight: '44px' } : { minHeight: '44px', color: '#333333' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {tab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 theme-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold theme-text mb-3 text-lg">Announcement</h3>
              <p className="text-sm" style={{ color: '#333333', lineHeight: '1.6' }}>{sample.overview.announcement}</p>
              <div className="mt-4 text-sm font-medium" style={{ color: '#757575' }}>
                <span className="font-semibold" style={{ color: '#333333' }}>Next class:</span> {sample.overview.nextClass}
              </div>
            </div>
            <div className="theme-card rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold theme-text mb-3 text-lg">Progress</h3>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${sample.overview.progress}%`, backgroundColor: '#4CAF50' }}></div>
              </div>
              <div className="text-sm font-medium mb-4" style={{ color: '#333333' }}>{sample.overview.progress}% complete</div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-medium mb-2" style={{ color: '#757575' }}>CLASS INFO</div>
                <div className="text-sm" style={{ color: '#333333' }}>
                  <div className="mb-1">👥 {sample.overview.totalStudents} students</div>
                  {sample.overview.schedule && <div className="mb-1">📅 {sample.overview.schedule}</div>}
                  {sample.overview.room && <div>📍 {sample.overview.room}</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'assignments' && (
          <div className="space-y-3">
            {sample.assignments.map((a) => (
              <div key={a.id} className="theme-card rounded-lg p-5 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="font-semibold theme-text mb-1 text-base">{a.title}</div>
                  <div className="text-sm" style={{ color: '#757575' }}>Due {a.due} • {a.points} pts</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    a.status === 'Submitted' 
                      ? 'bg-green-50 text-green-700' 
                      : a.status === 'Pending' 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'bg-gray-50'
                  }`} style={a.status === 'Assigned' ? { color: '#757575' } : {}}>
                    {a.status}
                  </span>
                  <button 
                    className="px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity" 
                    style={{ backgroundColor: '#0055A4', minHeight: '36px' }}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tests' && (
          <div className="space-y-3">
            {sample.tests.map((t) => (
              <div key={t.id} className="theme-card rounded-lg p-5 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="font-semibold theme-text mb-1 text-base">{t.title}</div>
                  <div className="text-sm" style={{ color: '#757575' }}>{t.type} • {t.duration}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    t.status === 'Available' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'bg-gray-50'
                  }`} style={t.status === 'Locked' ? { color: '#757575' } : {}}>
                    {t.status}
                  </span>
                  <button
                    onClick={() => onNavigate?.('arena')}
                    disabled={t.status !== 'Available'}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-opacity ${
                      t.status !== 'Available' 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'text-white hover:opacity-90'
                    }`}
                    style={t.status === 'Available' ? { backgroundColor: '#0077B6', minHeight: '36px' } : { color: '#757575', minHeight: '36px' }}
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'resources' && (
          <div className="grid md:grid-cols-2 gap-4">
            {sample.resources.map((r) => (
              <a key={r.id} className="theme-card rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: '#0055A4', color: '#FFFFFF' }}>
                    {r.type === 'PDF' ? '📄' : r.type === 'Link' ? '🔗' : '📊'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold theme-text mb-1">{r.title}</div>
                    <div className="text-sm" style={{ color: '#757575' }}>{r.type}{r.size ? ` • ${r.size}` : ''}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {tab === 'members' && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="theme-card rounded-lg p-5 shadow-sm">
              <div className="text-xs font-medium mb-2" style={{ color: '#757575' }}>TEACHER</div>
              <div className="font-semibold theme-text text-base">{sample.members.teacher}</div>
            </div>
            <div className="md:col-span-2 theme-card rounded-lg p-5 shadow-sm">
              <div className="text-xs font-medium mb-3" style={{ color: '#757575' }}>STUDENTS ({sample.members.students.length})</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sample.members.students.map(s => (
                  <div key={s.id} className="px-3 py-2.5 bg-gray-50 rounded-lg text-sm font-medium" style={{ color: '#333333' }}>{s.name}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
