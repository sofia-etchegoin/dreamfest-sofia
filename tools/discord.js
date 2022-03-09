const FS = require('fs').promises
const { existsSync } = require('fs')
const Path = require('path')

const main = async () => {
  const dirs = await FS.readdir(Path.join(__dirname, '..', 'packages'))

  const versions = {}
  for (const dir of dirs) {
    const packagePath = Path.join(
      __dirname,
      '..',
      'packages',
      dir,
      'package.json'
    )
    if (!existsSync(packagePath)) {
      process.stderr.write(`INFO: ${dir} does not have a package.json\n`)
      continue
    }

    try {
      const json = await FS.readFile(packagePath, 'utf8')
      const packageObj = JSON.parse(json)
      const deps = {
        ...(packageObj.dependencies || {}),
        ...(packageObj.devDependencies || {}),
      }

      for (const depName in deps) {
        const version = deps[depName]
        if (!versions[depName]) {
          versions[depName] = {}
        }

        if (!versions[depName][version]) {
          versions[depName][version] = []
        }

        versions[depName][version].push(dir)
      }
    } catch (err) {
      console.error({ dir, err })
    }
  }

  let badbois = {}
  for (const k in versions) {
    if (Object.keys(versions[k]).length > 1) {
      badbois[k] = versions[k]
    }
  }

  process.stdout.write(JSON.stringify(badbois, null, 2) + '\n')
}

main().catch((err) => {
  process.exitCode = 1
  console.error(`discord failed: ${err}`)
})
