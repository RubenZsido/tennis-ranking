import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as playersApi from '../api/playersApi'
import type { Player } from '../types/player'

type PlayersContextValue = {
  players: Player[]
  loading: boolean
  error: string | null
  refreshPlayers: () => Promise<void>
  upsertPlayer: (player: Player) => Promise<void>
  deletePlayer: (id: string) => Promise<void>
  getPlayerById: (id: string) => Player | undefined
}

const PlayersContext = createContext<PlayersContextValue | null>(null)

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshPlayers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await playersApi.fetchPlayers()
      setPlayers(list)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load players.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshPlayers()
  }, [refreshPlayers])

  const upsertPlayer = useCallback(async (player: Player) => {
    const exists = players.some((p) => p.id === player.id)
    const saved = exists
      ? await playersApi.updatePlayer(player)
      : await playersApi.createPlayer(player)
    setPlayers((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id)
      if (idx === -1) return [...prev, saved]
      const next = [...prev]
      next[idx] = saved
      return next
    })
    setError(null)
  }, [players])

  const deletePlayer = useCallback(async (id: string) => {
    await playersApi.deletePlayer(id)
    setPlayers((prev) => prev.filter((p) => p.id !== id))
    setError(null)
  }, [])

  const getPlayerById = useCallback(
    (id: string) => players.find((p) => p.id === id),
    [players],
  )

  const value = useMemo(
    () => ({
      players,
      loading,
      error,
      refreshPlayers,
      upsertPlayer,
      deletePlayer,
      getPlayerById,
    }),
    [players, loading, error, refreshPlayers, upsertPlayer, deletePlayer, getPlayerById],
  )

  return <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
}

export function usePlayers(): PlayersContextValue {
  const ctx = useContext(PlayersContext)
  if (!ctx) throw new Error('usePlayers must be used within PlayersProvider')
  return ctx
}
