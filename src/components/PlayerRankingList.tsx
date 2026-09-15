import type { Player } from '../types/player'
import {
  countryFlag,
  formatPoints,
  formatRankDelta,
  rankMovement,
} from '../utils/playerFormat'

type Props = {
  players: Player[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function PlayerRankingList({ players, selectedId, onSelect }: Props) {
  return (
    <div className="ranking-list-wrap">
      <div className="ranking-list-header" aria-hidden="true">
        <span className="col-rank">#</span>
        <span className="col-player">Player</span>
        <span className="col-points">Pts</span>
        <span className="col-move">+/-</span>
      </div>
      <ul
        className="ranking-list"
        role="listbox"
        aria-label="ATP singles ranking"
      >
        {players.map((player) => {
          const selected = player.id === selectedId
          const movement = rankMovement(player)
          return (
            <li key={player.id} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={selected}
                className={`ranking-row${selected ? ' is-selected' : ''}`}
                onClick={() => onSelect(player.id)}
              >
                <span className="col-rank">{player.rank}</span>
                <span className="col-player">
                  <span className="player-flag" aria-hidden="true">
                    {countryFlag(player.countryCode)}
                  </span>
                  <span className="player-name">{player.displayName}</span>
                  <span className="player-country">{player.countryCode}</span>
                </span>
                <span className="col-points">{formatPoints(player.points)}</span>
                <span
                  className={`col-move movement-${movement}`}
                  title="Rank change vs previous week"
                >
                  {formatRankDelta(player)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
