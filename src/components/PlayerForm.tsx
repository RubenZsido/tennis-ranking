import { useEffect, useState } from 'react'
import type { Backhand, Handedness, Player } from '../types/player'
import {
  createEmptyPlayer,
  playerFromForm,
  playerToForm,
  type PlayerFormData,
} from '../utils/playerDefaults'

type Props = {
  initial?: Player | null
  existingIds: string[]
  onSave: (player: Player) => void
  onCancel: () => void
}

export function PlayerForm({ initial, existingIds, onSave, onCancel }: Props) {
  const isCreate = !initial
  const [form, setForm] = useState<PlayerFormData>(() =>
    initial ? playerToForm(initial) : playerToForm(createEmptyPlayer()),
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setForm(initial ? playerToForm(initial) : playerToForm(createEmptyPlayer()))
    setError(null)
  }, [initial])

  function patch(fields: Partial<PlayerFormData>) {
    setForm((prev) => ({ ...prev, ...fields }))
    setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = playerFromForm(form, initial ?? null, existingIds)
    if ('error' in result) {
      setError(result.error)
      return
    }
    onSave(result.player)
  }

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <div className="player-form-header">
        <h2>{isCreate ? 'Add player' : `Edit ${initial?.displayName}`}</h2>
        <div className="player-form-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>

      <div className="player-form-stack">
        <label className="player-form-field">
          <span>Country *</span>
          <input
            value={form.countryCode}
            onChange={(e) => patch({ countryCode: e.target.value.toUpperCase() })}
            maxLength={2}
            placeholder="IT"
          />
        </label>

        <label className="player-form-field">
          <span>Age *</span>
          <input
            type="number"
            min={14}
            max={55}
            value={form.age}
            onChange={(e) => patch({ age: Number(e.target.value) })}
          />
        </label>

        <fieldset className="player-form-group">
          <legend>Plays *</legend>
          <div className="player-form-row">
            <label className="player-form-field">
              <span>Hand</span>
              <select
                value={form.handedness}
                onChange={(e) => patch({ handedness: e.target.value as Handedness })}
              >
                <option value="right">Right</option>
                <option value="left">Left</option>
              </select>
            </label>
            <label className="player-form-field">
              <span>Backhand</span>
              <select
                value={form.backhand}
                onChange={(e) => patch({ backhand: e.target.value as Backhand })}
              >
                <option value="two">Two-handed</option>
                <option value="one">One-handed</option>
              </select>
            </label>
          </div>
        </fieldset>

        <label className="player-form-field">
          <span>Career high *</span>
          <input
            type="number"
            min={1}
            value={form.careerHighRank}
            onChange={(e) => patch({ careerHighRank: Number(e.target.value) })}
            placeholder="1"
          />
        </label>

        <fieldset className="player-form-group">
          <legend>Titles *</legend>
          <div className="player-form-row">
            <label className="player-form-field">
              <span>Grand Slam</span>
              <input
                type="number"
                min={0}
                value={form.grandSlamTitles}
                onChange={(e) => patch({ grandSlamTitles: Number(e.target.value) })}
              />
            </label>
            <label className="player-form-field">
              <span>Total</span>
              <input
                type="number"
                min={0}
                value={form.careerTitles}
                onChange={(e) => patch({ careerTitles: Number(e.target.value) })}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="player-form-group">
          <legend>YTD *</legend>
          <div className="player-form-row">
            <label className="player-form-field">
              <span>Wins</span>
              <input
                type="number"
                min={0}
                value={form.ytdWins}
                onChange={(e) => patch({ ytdWins: Number(e.target.value) })}
              />
            </label>
            <label className="player-form-field">
              <span>Losses</span>
              <input
                type="number"
                min={0}
                value={form.ytdLosses}
                onChange={(e) => patch({ ytdLosses: Number(e.target.value) })}
              />
            </label>
          </div>
        </fieldset>

        <label className="player-form-field">
          <span>Coach</span>
          <input
            value={form.coach}
            onChange={(e) => patch({ coach: e.target.value })}
            placeholder="Simone Vagnozzi, Darren Cahill"
          />
        </label>
      </div>

      {error && <p className="player-form-error">{error}</p>}
    </form>
  )
}
