import { execSync, spawnSync } from 'node:child_process'
import { existsSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(repoRoot, 'apps/roadmap/dist')
const region = process.env.AWS_REGION || 'us-east-1'

if (!existsSync(join(dist, 'index.html'))) {
  console.error('Missing apps/roadmap/dist — run npm run build first.')
  process.exit(1)
}

function sh(cmd) {
  return execSync(cmd, { cwd: repoRoot, encoding: 'utf8' }).trim()
}

function run(bin, args) {
  const result = spawnSync(bin, args, { cwd: repoRoot, stdio: 'inherit' })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function terraformOut(name) {
  return sh(`terraform -chdir=stacks/roadmap output -raw ${name}`)
}

const bucket = process.env.ROADMAP_S3_BUCKET || terraformOut('bucket_name')
const distributionId = process.env.ROADMAP_CLOUDFRONT_ID || terraformOut('distribution_id')
const sha =
  process.env.GITHUB_SHA ||
  process.env.VITE_GIT_SHA ||
  sh('git rev-parse HEAD')

writeFileSync(join(dist, 'commit.txt'), `${sha}\n`)

const aws = ['--region', region]
run('aws', [
  's3',
  'sync',
  dist,
  `s3://${bucket}`,
  '--delete',
  '--cache-control',
  'public, max-age=31536000, immutable',
  '--exclude',
  'index.html',
  '--exclude',
  'commit.txt',
  '--exclude',
  'progress.json',
  ...aws,
])

function put(file, contentType) {
  run('aws', [
    's3',
    'cp',
    join(dist, file),
    `s3://${bucket}/${file}`,
    '--content-type',
    contentType,
    '--cache-control',
    'max-age=60, must-revalidate',
    ...aws,
  ])
}

put('index.html', 'text/html')
put('commit.txt', 'text/plain')
if (existsSync(join(dist, 'progress.json'))) {
  put('progress.json', 'application/json')
}

run('aws', [
  'cloudfront',
  'create-invalidation',
  '--distribution-id',
  distributionId,
  '--paths',
  '/*',
  ...aws,
])

console.log(`Published ${sha} to s3://${bucket} (distribution ${distributionId})`)
