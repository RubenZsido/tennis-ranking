import { useMemo, useState } from 'react'
import { getPlayerById, getPlayersSorted, rankingMeta } from '../data/mockPlayers'
import { formatDate } from '../utils/playerFormat'
import { PlayerDetailPanel } from './PlayerDetailPanel'
import { PlayerRankingList } from './PlayerRankingList'
import '../ranking.css'

export function RankingPage() {
  const players = useMemo(() => getPlayersSorted(), [])
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

  return (
    <div className="ranking-app">
      <header className="ranking-app-header">
        <h1>ATP Singles Ranking</h1>
        <p className="ranking-app-sub">
          As of {formatDate(rankingMeta.rankingAsOf)} · Top {players.length}
        </p>
      </header>

      <div
        className={`ranking-layout${mobileShowDetail ? ' mobile-detail-open' : ''}`}
      >
        <aside className="ranking-layout-list" aria-label="Ranking list">
          <PlayerRankingList
            players={players}
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
