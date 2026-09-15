import fs from 'fs'

const path = new URL('../src/data/mockPlayers.ts', import.meta.url)
let s = fs.readFileSync(path, 'utf8')
s = s.replace(
  "import type { MatchResult, Player, RankingMeta } from '../types/player'",
  "import type { Player, RankingMeta } from '../types/player'",
)
s = s.replace(/\n\/\*\* Sample results[\s\S]*?\n\}\n\n/, '\n')
s = s.replace(/\n    recentResults: results\([\s\S]*?\n    \]\),\n/g, '\n')
fs.writeFileSync(path, s)
