import type { Player } from '../types/player'
import {
  ageFromDob,
  backhandLabel,
  countryFlag,
  formatPoints,
  formatRankDelta,
  handednessLabel,
  rankMovement,
} from '../utils/playerFormat'

type Props = {
  player: Player | null
  onBack?: () => void
  showBack?: boolean
}

function DetailGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="detail-grid">
      {items.map(({ label, value }) => (
        <div key={label} className="detail-grid-row">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function PlayerDetailPanel({ player, onBack, showBack }: Props) {
  if (!player) {
    return (
      <div className="detail-panel detail-panel--empty">
        <p>Select a player from the ranking to view details.</p>
      </div>
    )
  }

  const movement = rankMovement(player)

  return (
    <div className="detail-panel">
      {showBack && onBack && (
        <button type="button" className="detail-back" onClick={onBack}>
          ← Back to list
        </button>
      )}

      <header className="detail-header detail-header--compact">
        <div className="detail-avatar" aria-hidden="true">
          {player.photoUrl ? (
            <img src={player.photoUrl} alt="" />
          ) : (
            <span className="detail-avatar-fallback">
              {player.firstName[0]}
              {player.lastName[0]}
            </span>
          )}
        </div>
        <div className="detail-header-text">
          <h2>
            {countryFlag(player.countryCode)} {player.displayName}
          </h2>
          <p className="detail-sub">
            #{player.rank} · {formatPoints(player.points)} pts
            <span className={`movement-${movement} detail-move`}>
              {' '}
              ({formatRankDelta(player)})
            </span>
          </p>
        </div>
      </header>

      <DetailGrid
        items={[
          { label: 'Country', value: player.countryCode },
          { label: 'Age', value: String(ageFromDob(player.dateOfBirth)) },
          {
            label: 'Plays',
            value: `${handednessLabel(player.handedness)}, ${backhandLabel(player.backhand)} backhand`,
          },
          {
            label: 'Career high',
            value: `#${player.careerHighRank}`,
          },
          {
            label: 'Titles',
            value: `${player.grandSlamTitles} Grand Slam · ${player.careerTitles} total`,
          },
          {
            label: 'YTD',
            value: `${player.ytdWins}–${player.ytdLosses}`,
          },
          ...(player.coach ? [{ label: 'Coach', value: player.coach }] : []),
        ]}
      />

      {player.bio && <p className="detail-bio">{player.bio}</p>}
    </div>
  )
}
