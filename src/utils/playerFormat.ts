import type { Player } from '../types/player'

/** Locale-friendly integer (ranking points) */
export function formatPoints(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

/** USD without cents for prize money */
export function formatUsd(value: number): string {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

/** ISO date → readable long date */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

/** Age as of today from dateOfBirth */
export function ageFromDob(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}

/** Approximate DOB from age (Jan 1 of birth year) for form round-trip */
export function dobFromAge(age: number): string {
  const year = new Date().getFullYear() - Math.round(age)
  return `${year}-01-01`
}

/** Positive delta = moved up (better rank number decreased) */
export function rankChange(player: Pick<Player, 'rank' | 'previousRank'>): number | null {
  if (player.previousRank == null) return null
  return player.previousRank - player.rank
}

export type RankMovement = 'up' | 'down' | 'same' | 'unknown'

export function rankMovement(player: Pick<Player, 'rank' | 'previousRank'>): RankMovement {
  const delta = rankChange(player)
  if (delta == null) return 'unknown'
  if (delta > 0) return 'up'
  if (delta < 0) return 'down'
  return 'same'
}

/** Label for list column: ↑2, ↓1, — */
export function formatRankDelta(player: Pick<Player, 'rank' | 'previousRank'>): string {
  const delta = rankChange(player)
  if (delta == null) return '—'
  if (delta === 0) return '—'
  const arrow = delta > 0 ? '↑' : '↓'
  return `${arrow}${Math.abs(delta)}`
}

/** ISO 3166-1 alpha-2 → flag emoji */
export function countryFlag(countryCode: string): string {
  const code = countryCode.toUpperCase()
  if (code.length !== 2) return ''
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)))
}

export function handednessLabel(h: Player['handedness']): string {
  return h === 'left' ? 'Left' : 'Right'
}

export function backhandLabel(b: Player['backhand']): string {
  return b === 'one' ? 'One-handed' : 'Two-handed'
}
