import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const progressFile = join(repoRoot, 'apps/roadmap/public/progress.json')

if (!existsSync(progressFile)) {
  console.error('Missing apps/roadmap/public/progress.json — run npm run write-progress first.')
  process.exit(1)
}

const awsRegion = ['--region', 'us-east-1']
const bucket = execSync('terraform -chdir=stacks/roadmap output -raw bucket_name', {
  cwd: repoRoot,
  encoding: 'utf8',
}).trim()
const distributionId = execSync(
  'terraform -chdir=stacks/roadmap output -raw distribution_id',
  { cwd: repoRoot, encoding: 'utf8' },
).trim()

execSync(
  `aws s3 cp "${progressFile}" "s3://${bucket}/progress.json" --content-type application/json --cache-control "max-age=60, must-revalidate" ${awsRegion.join(' ')}`,
  { cwd: repoRoot, stdio: 'inherit' },
)

execSync(
  `aws cloudfront create-invalidation --distribution-id "${distributionId}" --paths /progress.json ${awsRegion.join(' ')}`,
  { cwd: repoRoot, stdio: 'inherit' },
)
