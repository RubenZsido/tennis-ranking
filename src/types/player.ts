/** Tour and discipline — fixed at create for ATP singles mock */
export type Tour = 'ATP'
export type Discipline = 'singles'
export type Handedness = 'right' | 'left'
export type Backhand = 'one' | 'two'

export type FieldSection =
  | 'identity'
  | 'ranking'
  | 'profile'
  | 'career'
  | 'media'

export type FieldInputType =
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'boolean'
  | 'textarea'
  | 'url'

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

/** Drives future generic edit forms */
export interface PlayerFieldMeta {
  key: string
  label: string
  section: FieldSection
  inputType: FieldInputType
  editable: boolean
  required?: boolean
  min?: number
  max?: number
  enumValues?: readonly string[]
}

export const PLAYER_FIELD_META: PlayerFieldMeta[] = [
  { key: 'id', label: 'ID', section: 'identity', inputType: 'text', editable: false, required: true },
  { key: 'tour', label: 'Tour', section: 'identity', inputType: 'select', editable: false, enumValues: ['ATP'] },
  {
    key: 'discipline',
    label: 'Discipline',
    section: 'identity',
    inputType: 'select',
    editable: false,
    enumValues: ['singles'],
  },
  { key: 'rank', label: 'Rank', section: 'ranking', inputType: 'number', editable: true, required: true, min: 1 },
  {
    key: 'previousRank',
    label: 'Previous rank',
    section: 'ranking',
    inputType: 'number',
    editable: true,
    min: 1,
  },
  { key: 'points', label: 'Points', section: 'ranking', inputType: 'number', editable: true, min: 0 },
  { key: 'rankingAsOf', label: 'Ranking as of', section: 'ranking', inputType: 'date', editable: true },
  { key: 'firstName', label: 'First name', section: 'profile', inputType: 'text', editable: true, required: true },
  { key: 'lastName', label: 'Last name', section: 'profile', inputType: 'text', editable: true, required: true },
  { key: 'displayName', label: 'Display name', section: 'profile', inputType: 'text', editable: true, required: true },
  {
    key: 'countryCode',
    label: 'Country code',
    section: 'profile',
    inputType: 'text',
    editable: true,
    required: true,
  },
  { key: 'dateOfBirth', label: 'Date of birth', section: 'profile', inputType: 'date', editable: true, required: true },
  { key: 'heightCm', label: 'Height (cm)', section: 'profile', inputType: 'number', editable: true, min: 140, max: 220 },
  {
    key: 'handedness',
    label: 'Handedness',
    section: 'profile',
    inputType: 'select',
    editable: true,
    enumValues: ['right', 'left'],
  },
  {
    key: 'backhand',
    label: 'Backhand',
    section: 'profile',
    inputType: 'select',
    editable: true,
    enumValues: ['one', 'two'],
  },
  {
    key: 'turnedProYear',
    label: 'Turned pro',
    section: 'profile',
    inputType: 'number',
    editable: true,
  },
  { key: 'careerHighRank', label: 'Career high rank', section: 'career', inputType: 'number', editable: true, min: 1 },
  { key: 'careerHighDate', label: 'Career high date', section: 'career', inputType: 'date', editable: true },
  { key: 'careerTitles', label: 'Career titles', section: 'career', inputType: 'number', editable: true, min: 0 },
  { key: 'grandSlamTitles', label: 'Grand Slam titles', section: 'career', inputType: 'number', editable: true, min: 0 },
  { key: 'ytdWins', label: 'YTD wins', section: 'career', inputType: 'number', editable: true, min: 0 },
  { key: 'ytdLosses', label: 'YTD losses', section: 'career', inputType: 'number', editable: true, min: 0 },
  {
    key: 'prizeMoneyCareerUsd',
    label: 'Career prize money (USD)',
    section: 'career',
    inputType: 'number',
    editable: true,
    min: 0,
  },
  {
    key: 'prizeMoneyYtdUsd',
    label: 'YTD prize money (USD)',
    section: 'career',
    inputType: 'number',
    editable: true,
    min: 0,
  },
  { key: 'photoUrl', label: 'Photo URL', section: 'media', inputType: 'url', editable: true },
  { key: 'coach', label: 'Coach', section: 'media', inputType: 'text', editable: true },
  { key: 'birthplace', label: 'Birthplace', section: 'media', inputType: 'text', editable: true },
  { key: 'residence', label: 'Residence', section: 'media', inputType: 'text', editable: true },
  { key: 'bio', label: 'Bio', section: 'media', inputType: 'textarea', editable: true, max: 2000 },
]
