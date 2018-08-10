const fs = require('fs')
const path = require('path')
var recursiveCopy = require('recursive-copy')

function copy (bundler) {
  bundler.on('bundled', async bundle => {
    let url = path.join(__dirname, '../../', './package.json')

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

    const source = pkg['staticPath'].source

    const target = pkg['staticPath'].target

    const sourceArray = []

    const targetArray = []

    if (Array.isArray(source)) {
      for (let dir of source) {
        sourceArray.push(path.join(__dirname, '../../', dir))
      }
    } else {
      if (source && typeof source === 'string') {
        sourceArray.push(path.join(__dirname, '../../', source))
      }
    }

    if (Array.isArray(target)) {
      for (let dir of target) {
        targetArray.push(path.join(__dirname, '../../', dir))
      }
    } else {
      if (target && typeof target === 'string') {
        targetArray.push(path.join(__dirname, '../../', target))
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
        console.error(
          `No static assets directory with path "${sourceArray[i]}" found`
        )
      }
    }
  })
}

module.exports = copy
