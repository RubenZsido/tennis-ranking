import type { Player } from '../types/player'

const baseUrl = import.meta.env.VITE_API_URL ?? ''

async function parseError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string }
    if (data.error) return data.error
  } catch {
    /* non-JSON body */
  }
  return res.statusText || `Request failed (${res.status})`
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  if (!res.ok) throw new Error(await parseError(res))
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export function fetchPlayers(): Promise<Player[]> {
  return request<Player[]>('/api/players')
}

export function fetchPlayer(id: string): Promise<Player> {
  return request<Player>(`/api/players/${encodeURIComponent(id)}`)
}

export function createPlayer(player: Player): Promise<Player> {
  return request<Player>('/api/players', {
    method: 'POST',
    body: JSON.stringify(player),
  })
}

export function updatePlayer(player: Player): Promise<Player> {
  return request<Player>(`/api/players/${encodeURIComponent(player.id)}`, {
    method: 'PUT',
    body: JSON.stringify(player),
  })
}

export function deletePlayer(id: string): Promise<void> {
  return request<void>(`/api/players/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
