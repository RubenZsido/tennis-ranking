import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getPlayersSorted as getInitialSorted } from '../data/mockPlayers'
import type { Player } from '../types/player'

type PlayersContextValue = {
  players: Player[]
  upsertPlayer: (player: Player) => void
  getPlayerById: (id: string) => Player | undefined
}

const PlayersContext = createContext<PlayersContextValue | null>(null)

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(() => getInitialSorted())

  const upsertPlayer = useCallback((player: Player) => {
    setPlayers((prev) => {
      const idx = prev.findIndex((p) => p.id === player.id)
      if (idx === -1) return [...prev, player]
      const next = [...prev]
      next[idx] = player
      return next
    })
  }, [])

  const getPlayerById = useCallback(
    (id: string) => players.find((p) => p.id === id),
    [players],
  )

  const value = useMemo(
    () => ({ players, upsertPlayer, getPlayerById }),
    [players, upsertPlayer, getPlayerById],
  )

  return <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
}

export function usePlayers(): PlayersContextValue {
  const ctx = useContext(PlayersContext)
  if (!ctx) throw new Error('usePlayers must be used within PlayersProvider')
  return ctx
}
