import { useState, useMemo } from "react";
import { Search, Pencil, Trash2, Music2, X, Check, ChevronUp, ChevronDown } from "lucide-react";

type Genre = "すべて" | "J-POP" | "アニソン" | "ボカロ" | "ロック" | "洋楽" | "K-POP";

interface Song {
  id: number;
  title: string;
  artist: string;
  key: string;
  genre: Exclude<Genre, "すべて">;
  note: string;
}

const GENRES: Genre[] = ["すべて", "J-POP", "アニソン", "ボカロ", "ロック", "洋楽", "K-POP"];

const GENRE_COLORS: Record<Exclude<Genre, "すべて">, string> = {
  "J-POP":  "bg-sky-900/60 text-sky-300 border border-sky-700/50",
  "アニソン": "bg-pink-900/60 text-pink-300 border border-pink-700/50",
  "ボカロ":  "bg-teal-900/60 text-teal-300 border border-teal-700/50",
  "ロック":  "bg-orange-900/60 text-orange-300 border border-orange-700/50",
  "洋楽":   "bg-amber-900/60 text-amber-300 border border-amber-700/50",
  "K-POP":  "bg-purple-900/60 text-purple-300 border border-purple-700/50",
};

const INITIAL_SONGS: Song[] = [
  { id: 1,  title: "おやすみ泣き声、さよなら歌姫", artist: "クリープハイプ", key: "原キー", genre: "J-POP", note: "" },
  { id: 2,  title: "丸の内サディスティック", artist: "椎名林檎", key: "原キー", genre: "J-POP", note: "" },
  { id: 3,  title: "粉雪", artist: "レミオロメン", key: "原キー", genre: "J-POP", note: "" },
  { id: 4,  title: "アイネクライネ", artist: "米津玄師", key: "原キー", genre: "J-POP", note: "" },
  { id: 5,  title: "SHAMROCK", artist: "UVERworld", key: "原キー", genre: "ロック", note: "" },
  { id: 6,  title: "Pretender", artist: "Official髭男dism", key: "原キー", genre: "J-POP", note: "" },
  { id: 7,  title: "unravel", artist: "TK from 凛として時雨", key: "原キー", genre: "アニソン", note: "" },
  { id: 8,  title: "楓", artist: "スピッツ", key: "原キー", genre: "J-POP", note: "" },
  { id: 9,  title: "猫", artist: "DISH//", key: "原キー", genre: "J-POP", note: "" },
  { id: 10, title: "瞬き", artist: "back number", key: "原キー", genre: "J-POP", note: "" },
  { id: 11, title: "アンサイズニア", artist: "ONE OK ROCK", key: "原キー", genre: "ロック", note: "" },
  { id: 12, title: "天体観測", artist: "BUMP OF CHICKEN", key: "原キー", genre: "アニソン", note: "" },
  { id: 13, title: "ミックスナッツ", artist: "Official髭男dism", key: "原キー", genre: "アニソン", note: "" },
  { id: 14, title: "廻廻奇譚", artist: "Eve", key: "原キー", genre: "アニソン", note: "" },
  { id: 15, title: "怪獣の花唄", artist: "Vaundy", key: "原キー", genre: "J-POP", note: "" },
  { id: 16, title: "今宵の月のように", artist: "Elephant Kashimashi", key: "原キー", genre: "J-POP", note: "" },
  { id: 17, title: "Sign", artist: "FLOW", key: "原キー", genre: "アニソン", note: "" },
  { id: 18, title: "不可幸力", artist: "Vaundy", key: "原キー", genre: "J-POP", note: "" },
  { id: 19, title: "恋風邪にのせて", artist: "Vaundy", key: "原キー", genre: "J-POP", note: "" },
  { id: 20, title: "The Beginning", artist: "ONE OK ROCK", key: "原キー", genre: "J-POP", note: "" },
  { id: 21, title: "ワタリドリ", artist: "Alexandros", key: "原キー", genre: "ロック", note: "" },
  { id: 22, title: "ドラマツルギー", artist: "Eve", key: "原キー", genre: "J-POP", note: "" },
  { id: 23, title: "Wherever you are", artist: "ONE OK ROCK", key: "原キー", genre: "ロック", note: "" },
  { id: 24, title: "GLORIA", artist: "ZIGGY", key: "原キー", genre: "ロック", note: "" },
  { id: 25, title: "ガランド", artist: "ピコン", key: "原キー", genre: "ボカロ", note: "" },
  { id: 26, title: "ミルククラウン・オン・ソーネチカ", artist: "ユジー", key: "原キー", genre: "ボカロ", note: "" },
  { id: 27, title: "ありがとう〜", artist: "IKKI", key: "原キー", genre: "アニソン", note: "" },
  { id: 28, title: "ハロ／ハワユ", artist: "CIVILIAN", key: "原キー", genre: "ボカロ", note: "" },
  { id: 29, title: "ネイティブダンサー", artist: "サカナクション", key: "原キー", genre: "J-POP", note: "" },
  { id: 30, title: "ジャガーノート", artist: "夏代孝明", key: "原キー", genre: "ボカロ", note: "" },
  { id: 31, title: "ニア", artist: "夏代孝明", key: "原キー", genre: "ボカロ", note: "" },
  { id: 32, title: "ホシアイ", artist: "レフティーモンスターP", key: "-3", genre: "ボカロ", note: "" },
  { id: 33, title: "IMAGINARY LIKE THE JUSTICE", artist: "ナナホシ管弦楽団様", key: "-1", genre: "ボカロ", note: "" },
  { id: 34, title: "アルビレオ", artist: "ロクデナシ", key: "-2", genre: "ボカロ", note: "" },
  { id: 35, title: "少女レイ", artist: "みきとP", key: "-4", genre: "ボカロ", note: "" },
  { id: 36, title: "サリシノハラ", artist: "みきとP", key: "-5", genre: "ボカロ", note: "" },
  { id: 37, title: "吉原ラメント", artist: "亜沙", key: "原キー", genre: "ボカロ", note: "" },
  { id: 38, title: "バレリーコ", artist: "みきとP", key: "+3", genre: "ボカロ", note: "" },
  { id: 39, title: "カタオモイ", artist: "Aimer", key: "-4", genre: "J-POP", note: "" },
  { id: 40, title: "刹那プラス", artist: "みきとP", key: "原キー", genre: "ボカロ", note: "" },
  { id: 41, title: "愛迷エレジー", artist: "DECO*27", key: "原キー", genre: "ボカロ", note: "" },
  { id: 42, title: "閃光", artist: "Alexandros", key: "原キー", genre: "ボカロ", note: "" },
  { id: 43, title: "One day", artist: "The ROOTLESS", key: "原キー", genre: "アニソン", note: "ワンピース" },
  { id: 44, title: "ラフメイカー", artist: "BUMP OF CHICKEN", key: "原キー", genre: "ロック", note: "" },
  { id: 45, title: "藍才", artist: "Eve", key: "原キー", genre: "J-POP", note: "" },
  { id: 46, title: "逆光", artist: "Ado", key: "原キー", genre: "アニソン", note: "" },
  { id: 47, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 48, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 49, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 50, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 51, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 52, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 53, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 54, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 55, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 56, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 57, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 58, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 59, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 60, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 61, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 62, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 63, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 64, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 65, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 66, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 67, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 68, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 69, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 70, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 71, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 72, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 73, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 74, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 75, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 76, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 77, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 78, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 79, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 80, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 81, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 82, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 83, title: "", artist: "", key: "", genre: "", note: "" },
  { id: 84, title: "", artist: "", key: "", genre: "", note: "" },
];

type SortKey = "title" | "artist" | "key" | "genre";
type SortDir = "asc" | "desc";

const EMPTY_FORM = { title: "", artist: "", key: "原キー", genre: "J-POP" as Exclude<Genre, "すべて">, note: "" };

export default function App() {
  const [songs, setSongs]             = useState<Song[]>(INITIAL_SONGS);
  const [query, setQuery]             = useState("");
  const [activeGenre, setActiveGenre] = useState<Genre>("すべて");
  const [sortKey, setSortKey]         = useState<SortKey>("title");
  const [sortDir, setSortDir]         = useState<SortDir>("asc");
  const [editSong, setEditSong]       = useState<Song | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Song | null>(null);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [addOpen, setAddOpen]         = useState(false);
  const [addForm, setAddForm]         = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return songs
      .filter(s =>
        (activeGenre === "すべて" || s.genre === activeGenre) &&
        (!q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q))
      )
      .sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = av.localeCompare(bv, "ja");
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [songs, query, activeGenre, sortKey, sortDir]);

  function openEdit(s: Song) {
    setEditSong(s);
    setForm({ title: s.title, artist: s.artist, key: s.key, genre: s.genre, note: s.note });
  }

  function saveEdit() {
    if (!editSong || !form.title.trim() || !form.artist.trim()) return;
    setSongs(prev => prev.map(s => s.id === editSong.id ? { ...s, ...form } : s));
    setEditSong(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setSongs(prev => prev.filter(s => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function saveAdd() {
    if (!addForm.title.trim() || !addForm.artist.trim()) return;
    const newId = Math.max(0, ...songs.map(s => s.id)) + 1;
    setSongs(prev => [...prev, { id: newId, ...addForm }]);
    setAddOpen(false);
    setAddForm(EMPTY_FORM);
  }

  function handleSort(k: SortKey) {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
  }

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortDir === "asc" ? <ChevronUp size={13} className="text-accent" /> : <ChevronDown size={13} className="text-accent" />
      : <ChevronUp size={13} className="opacity-20" />;

  return (
    <div className="min-h-screen bg-background font-['Inter',sans-serif]">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Title + count */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30">
                <Music2 size={16} className="text-accent" />
              </div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-lg font-semibold tracking-tight text-foreground">カラオケ曲リスト</h1>
                <span className="text-xs font-mono text-muted-foreground tabular-nums">
                  {filtered.length} / {songs.length} 曲
                </span>
              </div>
            </div>

            {/* Search + add */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="曲名・アーティストで検索"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="h-9 w-full rounded-md border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition"
                />
              </div>
              <button
                onClick={() => { setAddOpen(true); setAddForm(EMPTY_FORM); }}
                className="h-9 px-4 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                ＋ 追加
              </button>
            </div>
          </div>

          {/* Genre filter chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                  activeGenre === g
                    ? "bg-accent text-accent-foreground border-accent shadow-[0_0_8px_rgba(139,92,246,0.35)]"
                    : "bg-muted/40 text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6">

        {/* Desktop table */}
        <div className="hidden md:block rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card/50">
                {(["title","artist","key","genre"] as SortKey[]).map(k => {
                  const labels: Record<SortKey,string> = { title:"曲名", artist:"アーティスト", key:"キー", genre:"ジャンル" };
                  return (
                    <th
                      key={k}
                      onClick={() => handleSort(k)}
                      className="cursor-pointer select-none px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                    >
                      <span className="flex items-center gap-1">{labels[k]} <SortIcon k={k} /></span>
                    </th>
                  );
                })}
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">備考</th>
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground text-sm">
                    該当する曲が見つかりませんでした
                  </td>
                </tr>
              )}
              {filtered.map(song => (
                <tr key={song.id} className="group bg-card hover:bg-secondary/40 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-foreground max-w-[200px]">
                    <span className="truncate block">{song.title}</span>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground">{song.artist}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs bg-muted/50 text-foreground px-2 py-0.5 rounded border border-border">
                      {song.key}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${GENRE_COLORS[song.genre]}`}>
                      {song.genre}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground text-xs max-w-[180px]">
                    <span className="truncate block">{song.note || "—"}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(song)}
                        className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        title="編集"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(song)}
                        className="p-1.5 rounded hover:bg-destructive/15 transition-colors text-muted-foreground hover:text-destructive"
                        title="削除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden space-y-2">
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">
              該当する曲が見つかりませんでした
            </div>
          )}
          {filtered.map(song => (
            <div
              key={song.id}
              className="rounded-xl border border-border bg-card px-4 py-3.5 flex items-start justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{song.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{song.artist}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono text-xs bg-muted/50 text-foreground px-2 py-0.5 rounded border border-border">
                    {song.key}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${GENRE_COLORS[song.genre]}`}>
                    {song.genre}
                  </span>
                  {song.note && (
                    <span className="text-xs text-muted-foreground truncate max-w-[180px]">{song.note}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  onClick={() => openEdit(song)}
                  className="p-2 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setDeleteTarget(song)}
                  className="p-2 rounded hover:bg-destructive/15 transition-colors text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Edit Modal ─────────────────────────────────────────── */}
      {editSong && (
        <Modal title="曲を編集" onClose={() => setEditSong(null)}>
          <SongForm form={form} setForm={setForm} />
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setEditSong(null)} className="px-4 py-2 rounded-md text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors">
              キャンセル
            </button>
            <button onClick={saveEdit} className="px-4 py-2 rounded-md text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors flex items-center gap-1.5">
              <Check size={14} /> 保存
            </button>
          </div>
        </Modal>
      )}

      {/* ── Add Modal ──────────────────────────────────────────── */}
      {addOpen && (
        <Modal title="曲を追加" onClose={() => setAddOpen(false)}>
          <SongForm form={addForm} setForm={setAddForm} />
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setAddOpen(false)} className="px-4 py-2 rounded-md text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors">
              キャンセル
            </button>
            <button onClick={saveAdd} className="px-4 py-2 rounded-md text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors flex items-center gap-1.5">
              <Check size={14} /> 追加
            </button>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirm ─────────────────────────────────────── */}
      {deleteTarget && (
        <Modal title="曲を削除" onClose={() => setDeleteTarget(null)}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">「{deleteTarget.title}」</span> を削除しますか？<br />
            この操作は取り消せません。
          </p>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 rounded-md text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors">
              キャンセル
            </button>
            <button onClick={confirmDelete} className="px-4 py-2 rounded-md text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center gap-1.5">
              <Trash2 size={14} /> 削除する
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ── Shared Modal wrapper ─────────────────────────────────── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <button onClick={onClose} className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Song form fields ─────────────────────────────────────── */
type Genre2 = Exclude<Genre, "すべて">;
type FormState = { title: string; artist: string; key: string; genre: Genre2; note: string };

function SongForm({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const field = (label: string, el: React.ReactNode) => (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {el}
    </div>
  );

  const input = (key: keyof FormState, placeholder: string) => (
    <input
      type="text"
      placeholder={placeholder}
      value={form[key]}
      onChange={e => setForm({ ...form, [key]: e.target.value })}
      className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition"
    />
  );

  return (
    <div className="space-y-4">
      {field("曲名 *", input("title", "例：夜に駆ける"))}
      {field("アーティスト *", input("artist", "例：YOASOBI"))}
      <div className="grid grid-cols-2 gap-3">
        {field("キー", input("key", "例：原キー / +2"))}
        {field("ジャンル",
          <select
            value={form.genre}
            onChange={e => setForm({ ...form, genre: e.target.value as Genre2 })}
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition"
          >
            {(["J-POP","アニソン","ボカロ","ロック","洋楽","K-POP"] as Genre2[]).map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        )}
      </div>
      {field("備考",
        <input
          type="text"
          placeholder="メモ（任意）"
          value={form.note}
          onChange={e => setForm({ ...form, note: e.target.value })}
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent/40 outline-none transition"
        />
      )}
    </div>
  );
}
