const fs = require('fs')
const path = require('path')
var recursiveCopy = require('recursive-copy')
const mkdirp = require('mkdirp')

function copy(bundler) {
  bundler.on('bundled', async bundle => {
    // parcel-plugin-copy/
    // let relative = './'

    // node-modules/parcel-plugin-copy/
    let relative = '../../'

    let url = path.join(__dirname, relative, './package.json')

    let pkg = {
      staticPath: {
        source: '',
        target: '',
        typeFiles: ''
      }
    }

    try {
      pkg = require(url)
    } catch (error) {
      console.error('not found package.json')
    }

    let sourceArray = []

    let targetArray = []
    
    let typeArray = []

    const typeFiles = pkg['staticPath'].typeFiles
     
    let source = pkg["staticPath"].source
    try {
      // In case of array we need to parse the string
      source = JSON.parse(source)
    } catch (err) {}

    let target = pkg["staticPath"].target
    try {
      // In case of array we need to parse the string
      target = JSON.parse(target)
    } catch (err) {}

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

    if (typeFiles && typeof typeFiles === 'string') {
      typeArray = typeFiles.split(",")
    } else {
      typeArray = ['*.*']
    }
    
    for (let i = 0; i < sourceArray.length; i++) {
      if (fs.existsSync(sourceArray[i])) {
        if (!fs.existsSync(targetArray[i])) {
          mkdirp.sync(targetArray[i])
        }
        try {
          await recursiveCopy(sourceArray[i], targetArray[i], {
            overwrite: true,
            filter: typeArray
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
