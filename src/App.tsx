import { useState } from 'react'
import { PlayersProvider } from './context/PlayersContext'
import { PlayersAdminPage } from './components/PlayersAdminPage'
import { RankingPage } from './components/RankingPage'
import './players-admin.css'

type View = 'ranking' | 'admin'

function AppShell() {
  const [view, setView] = useState<View>('ranking')

  return (
    <>
      <nav className="app-nav" aria-label="Main">
        <button
          type="button"
          className={view === 'ranking' ? 'is-active' : ''}
          onClick={() => setView('ranking')}
        >
          Rankings
        </button>
        <button
          type="button"
          className={view === 'admin' ? 'is-active' : ''}
          onClick={() => setView('admin')}
        >
          Manage players
        </button>
      </nav>
      {view === 'ranking' ? <RankingPage /> : <PlayersAdminPage />}
    </>
  )
}

function App() {
  return (
    <PlayersProvider>
      <AppShell />
    </PlayersProvider>
  )
}

export default App
