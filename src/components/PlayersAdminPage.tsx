import { useMemo, useState } from 'react'
import { usePlayers } from '../context/PlayersContext'
import type { Player } from '../types/player'
import { countryFlag } from '../utils/playerFormat'
import { PlayerForm } from './PlayerForm'
import '../players-admin.css'

type EditorMode = { kind: 'closed' } | { kind: 'create' } | { kind: 'edit'; id: string }

export function PlayersAdminPage() {
  const { players, loading, error, upsertPlayer, deletePlayer, getPlayerById, refreshPlayers } =
    usePlayers()
  const [editor, setEditor] = useState<EditorMode>({ kind: 'closed' })
  const [actionError, setActionError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const sorted = useMemo(
    () => [...players].sort((a, b) => a.rank - b.rank),
    [players],
  )

  const editingPlayer: Player | null =
    editor.kind === 'edit' ? getPlayerById(editor.id) ?? null : null

  const existingIds = useMemo(
    () =>
      players
        .filter((p) => editor.kind !== 'edit' || p.id !== editor.id)
        .map((p) => p.id),
    [players, editor],
  )

  function openCreate() {
    setActionError(null)
    setEditor({ kind: 'create' })
  }

  function openEdit(id: string) {
    setActionError(null)
    setEditor({ kind: 'edit', id })
  }

  function closeEditor() {
    setEditor({ kind: 'closed' })
  }

  async function handleSave(player: Player) {
    setSaving(true)
    setActionError(null)
    try {
      await upsertPlayer(player)
      closeEditor()
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, displayName: string) {
    if (!window.confirm(`Delete ${displayName}? This cannot be undone.`)) return
    setActionError(null)
    try {
      await deletePlayer(id)
      if (editor.kind === 'edit' && editor.id === id) closeEditor()
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Delete failed.')
    }
  }

  const showForm = editor.kind !== 'closed'

  if (loading) {
    return (
      <div className="players-admin">
        <p className="players-admin-sub">Loading players…</p>
      </div>
    )
  }

  return (
    <div className="players-admin">
      <header className="players-admin-header">
        <div>
          <h1>Manage players</h1>
          <p className="players-admin-sub">Same fields as the player detail panel.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          Add player
        </button>
      </header>

      {(error || actionError) && (
        <p className="players-admin-error" role="alert">
          {actionError ?? error}{' '}
          {error && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => void refreshPlayers()}>
              Retry
            </button>
          )}
        </p>
      )}

      <div className={`players-admin-layout${showForm ? ' players-admin-layout--form' : ''}`}>
        <section className="players-admin-table-wrap" aria-label="Player list">
          <table className="players-admin-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Country</th>
                <th>Points</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className={editor.kind === 'edit' && editor.id === p.id ? 'is-active' : ''}>
                  <td>{p.rank}</td>
                  <td>{p.displayName}</td>
                  <td>
                    <span title={p.countryCode}>
                      {countryFlag(p.countryCode)} {p.countryCode}
                    </span>
                  </td>
                  <td>{p.points.toLocaleString()}</td>
                  <td className="players-admin-row-actions">
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(p.id)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => void handleDelete(p.id, p.displayName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {showForm && (
          <aside className="players-admin-form-wrap" aria-label="Player editor">
            <PlayerForm
              key={editor.kind === 'create' ? 'create' : editor.id}
              initial={editor.kind === 'edit' ? editingPlayer : null}
              existingIds={existingIds}
              saving={saving}
              onSave={handleSave}
              onCancel={closeEditor}
            />
          </aside>
        )}
      </div>
    </div>
  )
}
