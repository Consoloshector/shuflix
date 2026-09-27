import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/admin' && (location.pathname === '/admin' || location.pathname === '/admin/')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
      {/* SOL MENYU */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <h2 className="text-lg font-extrabold tracking-wider uppercase text-zinc-100">
              Admin Panel
            </h2>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/admin/matches"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive('/admin/matches') || isActive('/admin')
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              ⚽ Matç İdarəetməsi
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <Link to="/" className="text-xs text-zinc-400 hover:text-white transition flex items-center gap-1 font-medium">
            ← Əsas Sayta Qayıt
          </Link>
        </div>
      </aside>

      {/* SAĞ TƏRƏF */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<MatchesAdmin />} />
          <Route path="/matches" element={<MatchesAdmin />} />
        </Routes>
      </main>
    </div>
  );
}

// REAL FUNKSİONAL MATÇ İDARƏETMƏSİ
function MatchesAdmin() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State-ləri
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [score, setScore] = useState('');
  const [league, setLeague] = useState('Premier League');
  const [matchDate, setMatchDate] = useState('');
  const [homeLogo, setHomeLogo] = useState('');
  const [awayLogo, setAwayLogo] = useState('');
  const [homeBg, setHomeBg] = useState('#000c8a');
  const [awayBg, setAwayBg] = useState('#ed8b02');

  // Firestore-dan matçları çəkirik
  const fetchMatches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatches(list);
    } catch (error) {
      console.error("Matçlar yüklənərkən xəta:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // Yeni matç əlavə et
  const handleAddMatch = async (e) => {
    e.preventDefault();
    if (!team1 || !team2 || !score) return alert("Zəhmət olmasa vacib sahələri doldurun!");

    setLoading(true);
    try {
      await addDoc(collection(db, 'matches'), {
        team1,
        team2,
        score,
        league,
        match_date: matchDate || new Date().toISOString().split('T')[0],
        homeLogo,
        awayLogo,
        homeBg,
        awayBg,
        rating: 8.0,
        home_formation: [1, 4, 2, 3, 1],
        possesions: { home: 50, away: 50, home_percent: 50, away_percent: 50 },
        shoots: { home: 10, away: 10, home_percent: 50, away_percent: 50 },
        pass: { home: 400, away: 400, home_percent: 50, away_percent: 50 },
        lineups: { home: [], away: [] },
        substitutes: { home: [], away: [] },
        createdAt: new Date()
      });

      // Formu sıfırla
      setTeam1('');
      setTeam2('');
      setScore('');
      setHomeLogo('');
      setAwayLogo('');
      fetchMatches(); // Siyahını yenilə
      alert("Matç uğurla əlavə olundu!");
    } catch (error) {
      console.error("Xəta:", error);
      alert("Xəta baş verdi!");
    } finally {
      setLoading(false);
    }
  };

  // Matçı sil
  const handleDeleteMatch = async (id) => {
    if (window.confirm("Bu matçı silməyə əminsiniz?")) {
      try {
        await deleteDoc(doc(db, 'matches', id));
        fetchMatches();
      } catch (error) {
        console.error("Silmə xətası:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold">Matç İdarəetməsi</h1>
        <p className="text-xs text-zinc-400 mt-1">Sistemə yeni matçlar daxil edin və ya mövcud olanları silin.</p>
      </div>

      {/* MATÇ ƏLAVƏ ETMƏ FORMU */}
      <form onSubmit={handleAddMatch} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4 max-w-3xl">
        <h3 className="text-sm font-bold text-red-500 uppercase tracking-wide">Yeni Matç Daxil Et</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input 
            type="text" 
            placeholder="Meydan Sahibi (məs: Chelsea)" 
            value={team1} 
            onChange={(e) => setTeam1(e.target.value)} 
            className="p-2.5 bg-zinc-950 border border-zinc-800 rounded text-xs focus:outline-none focus:border-red-600"
          />
          <input 
            type="text" 
            placeholder="Qonaq Komanda (məs: Hull City)" 
            value={team2} 
            onChange={(e) => setTeam2(e.target.value)} 
            className="p-2.5 bg-zinc-950 border border-zinc-800 rounded text-xs focus:outline-none focus:border-red-600"
          />
          <input 
            type="text" 
            placeholder="Hesab (məs: 2 - 2)" 
            value={score} 
            onChange={(e) => setScore(e.target.value)} 
            className="p-2.5 bg-zinc-950 border border-zinc-800 rounded text-xs focus:outline-none focus:border-red-600"
          />
          <input 
            type="text" 
            placeholder="Liqa (məs: Premier League)" 
            value={league} 
            onChange={(e) => setLeague(e.target.value)} 
            className="p-2.5 bg-zinc-950 border border-zinc-800 rounded text-xs focus:outline-none focus:border-red-600"
          />
          <input 
            type="text" 
            placeholder="Home Logo URL" 
            value={homeLogo} 
            onChange={(e) => setHomeLogo(e.target.value)} 
            className="p-2.5 bg-zinc-950 border border-zinc-800 rounded text-xs focus:outline-none focus:border-red-600"
          />
          <input 
            type="text" 
            placeholder="Away Logo URL" 
            value={awayLogo} 
            onChange={(e) => setAwayLogo(e.target.value)} 
            className="p-2.5 bg-zinc-950 border border-zinc-800 rounded text-xs focus:outline-none focus:border-red-600"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-2.5 rounded-lg text-xs font-semibold w-full md:w-auto"
        >
          {loading ? 'Əlavə olunur...' : 'Matçı Yadda Saxla'}
        </button>
      </form>

      {/* MÖVCUD MATÇLAR SİYAHISI */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-zinc-200 mb-4">Bazadakı Matçlar ({matches.length})</h3>
        
        {matches.length === 0 ? (
          <p className="text-xs text-zinc-500">Hələ ki, bazada matç yoxdur.</p>
        ) : (
          <div className="space-y-2">
            {matches.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-red-500">{item.league}</span>
                  <span className="text-xs text-zinc-200">{item.team1} {item.score} {item.team2}</span>
                </div>
                
                <button 
                  onClick={() => handleDeleteMatch(item.id)}
                  className="bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white px-2.5 py-1 rounded text-[11px] transition"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}