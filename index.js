const fs = require('fs')
const path = require('path')
var recursiveCopy = require('recursive-copy')

function copy(bundler) {
  bundler.on('bundled', async bundle => {
    let relative = '../../'

    let url = path.join(__dirname, relative, './package.json')

    let pkg = {
      staticPath: {
        source: '',
        target: ''
      }
    }

    try {
      pkg = require(url)
    } catch (error) {
      console.error('not found package.json')
    }

    let sourceArray = []

    let targetArray = []

    const source = pkg['staticPath'].source

    const target = pkg['staticPath'].target

    if (Array.isArray(source)) {
      for (let dir of source) {
        sourceArray.push(path.join(__dirname, relative, dir))
      }
    } else {
      if (source && typeof source === 'string') {
        sourceArray.push(path.join(__dirname, relative, source))
      }
    }

    if (Array.isArray(target)) {
      for (let dir of target) {
        targetArray.push(path.join(__dirname, relative, dir))
      }
    } else {
      if (target && typeof target === 'string') {
        targetArray.push(path.join(__dirname, relative, target))
      }
    }

    for (let i = 0; i < sourceArray.length; i++) {
      if (fs.existsSync(sourceArray[i])) {
        try {
          await recursiveCopy(sourceArray[i], targetArray[i], {
            overwrite: true
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        console.error(`"${sourceArray[i]}" static directory not found`)
      }
    }
  })
}

module.exports = copy
