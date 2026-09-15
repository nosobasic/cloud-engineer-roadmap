import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { defaultStatuses } from '../src/data/roadmap.js'
import { buildProgressSnapshot } from '../src/lib/progressSnapshot.js'

const root = dirname(fileURLToPath(import.meta.url))
const snapshot = buildProgressSnapshot(defaultStatuses())
const out = join(root, '../public/progress.json')

writeFileSync(out, `${JSON.stringify(snapshot, null, 2)}\n`)
console.log(`Wrote ${out}`)
