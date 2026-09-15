/** Tour and discipline — fixed at create for ATP singles mock */
export type Tour = 'ATP'
export type Discipline = 'singles'
export type Handedness = 'right' | 'left'
export type Backhand = 'one' | 'two'

/** Shared ranking week metadata (mock header) */
export interface RankingMeta {
  rankingAsOf: string
  tour: Tour
  discipline: Discipline
}

/** Full player record — same shape intended for future API CRUD */
export interface Player {
  id: string
  tour: Tour
  discipline: Discipline
  rank: number
  previousRank: number | null
  points: number
  rankingAsOf: string
  firstName: string
  lastName: string
  displayName: string
  countryCode: string
  dateOfBirth: string
  heightCm: number
  handedness: Handedness
  backhand: Backhand
  turnedProYear: number
  careerHighRank: number
  careerHighDate: string
  careerTitles: number
  grandSlamTitles: number
  ytdWins: number
  ytdLosses: number
  prizeMoneyCareerUsd: number
  prizeMoneyYtdUsd: number
  photoUrl: string | null
  coach: string | null
  birthplace: string | null
  residence: string | null
  bio: string | null
}
