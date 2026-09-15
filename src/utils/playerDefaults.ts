import { RANKING_AS_OF } from '../data/mockPlayers'
import type { Backhand, Handedness, Player } from '../types/player'
import { ageFromDob, dobFromAge } from './playerFormat'

/** Matches labels on the player detail panel */
export type PlayerFormData = {
  countryCode: string
  age: number
  handedness: Handedness
  backhand: Backhand
  careerHighRank: number
  grandSlamTitles: number
  careerTitles: number
  ytdWins: number
  ytdLosses: number
  coach: string
}

export function playerToForm(player: Player): PlayerFormData {
  return {
    countryCode: player.countryCode,
    age: ageFromDob(player.dateOfBirth),
    handedness: player.handedness,
    backhand: player.backhand,
    careerHighRank: player.careerHighRank,
    grandSlamTitles: player.grandSlamTitles,
    careerTitles: player.careerTitles,
    ytdWins: player.ytdWins,
    ytdLosses: player.ytdLosses,
    coach: player.coach ?? '',
  }
}

/** Defaults for fields not edited in the form */
export function createEmptyPlayer(): Player {
  return {
    id: '',
    tour: 'ATP',
    discipline: 'singles',
    rank: 100,
    previousRank: null,
    points: 0,
    rankingAsOf: RANKING_AS_OF,
    firstName: 'New',
    lastName: 'Player',
    displayName: 'New Player',
    countryCode: 'US',
    dateOfBirth: dobFromAge(25),
    heightCm: 180,
    handedness: 'right',
    backhand: 'two',
    turnedProYear: new Date().getFullYear(),
    careerHighRank: 100,
    careerHighDate: RANKING_AS_OF,
    careerTitles: 0,
    grandSlamTitles: 0,
    ytdWins: 0,
    ytdLosses: 0,
    prizeMoneyCareerUsd: 0,
    prizeMoneyYtdUsd: 0,
    photoUrl: null,
    coach: null,
    birthplace: null,
    residence: null,
    bio: null,
  }
}

/** Validate form and merge into a full Player record */
export function playerFromForm(
  form: PlayerFormData,
  existing: Player | null,
  takenIds: string[],
): { player: Player } | { error: string } {
  const countryCode = form.countryCode.trim().toUpperCase()
  const coach = form.coach.trim()

  if (!/^[A-Z]{2}$/.test(countryCode)) return { error: 'Country must be a 2-letter code (e.g. IT).' }
  if (!Number.isFinite(form.age) || form.age < 14 || form.age > 55) {
    return { error: 'Age must be between 14 and 55.' }
  }
  if (!Number.isFinite(form.careerHighRank) || form.careerHighRank < 1) {
    return { error: 'Career high must be at least #1.' }
  }
  if (form.grandSlamTitles < 0 || form.careerTitles < 0) {
    return { error: 'Title counts cannot be negative.' }
  }
  if (form.grandSlamTitles > form.careerTitles) {
    return { error: 'Grand Slam titles cannot exceed total titles.' }
  }
  if (form.ytdWins < 0 || form.ytdLosses < 0) {
    return { error: 'YTD wins and losses cannot be negative.' }
  }

  const base = existing ?? createEmptyPlayer()
  let id = existing?.id ?? `player-${Date.now()}`
  while (!existing && takenIds.includes(id)) {
    id = `player-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }

  return {
    player: {
      ...base,
      id,
      countryCode,
      dateOfBirth: dobFromAge(form.age),
      handedness: form.handedness,
      backhand: form.backhand,
      careerHighRank: Math.round(form.careerHighRank),
      grandSlamTitles: Math.round(form.grandSlamTitles),
      careerTitles: Math.round(form.careerTitles),
      ytdWins: Math.round(form.ytdWins),
      ytdLosses: Math.round(form.ytdLosses),
      coach: coach === '' ? null : coach,
    },
  }
}
