import { useMemo, useState } from 'react'
import { usePlayers } from '../context/PlayersContext'
import { RANKING_AS_OF } from '../utils/playerDefaults'
import { formatDate } from '../utils/playerFormat'
import { PlayerDetailPanel } from './PlayerDetailPanel'
import { PlayerRankingList } from './PlayerRankingList'
import '../ranking.css'

export function RankingPage() {
  const { players, loading, error, getPlayerById, refreshPlayers } = usePlayers()
  const sortedPlayers = useMemo(
    () => [...players].sort((a, b) => a.rank - b.rank),
    [players],
  )
  // Date comes from DB rows; constant is only a header fallback when the list is empty
  const rankingAsOf = sortedPlayers[0]?.rankingAsOf ?? RANKING_AS_OF
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mobileShowDetail, setMobileShowDetail] = useState(false)

  const selectedPlayer = selectedId ? getPlayerById(selectedId) ?? null : null

  function handleSelect(id: string) {
    setSelectedId(id)
    setMobileShowDetail(true)
  }

  function handleBack() {
    setMobileShowDetail(false)
  }

  if (loading) {
    return (
      <div className="ranking-app">
        <p className="ranking-app-sub">Loading rankings…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ranking-app">
        <p className="ranking-app-sub" role="alert">
          {error}{' '}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => void refreshPlayers()}>
            Retry
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className="ranking-app">
      <header className="ranking-app-header">
        <h1>ATP Singles Ranking</h1>
        <p className="ranking-app-sub">
          {sortedPlayers.length === 0
            ? 'No players in the database'
            : `As of ${formatDate(rankingAsOf)} · Top ${sortedPlayers.length}`}
        </p>
      </header>

      <div
        className={`ranking-layout${mobileShowDetail ? ' mobile-detail-open' : ''}`}
      >
        <aside className="ranking-layout-list" aria-label="Ranking list">
          <PlayerRankingList
            players={sortedPlayers}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </aside>
        <main className="ranking-layout-detail" aria-label="Player details">
          <PlayerDetailPanel
            player={selectedPlayer}
            showBack={mobileShowDetail}
            onBack={handleBack}
          />
        </main>
      </div>
    </div>
  )
}
