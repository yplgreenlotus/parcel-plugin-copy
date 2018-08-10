const fs = require('fs')
const path = require('path')
const Bundler = require('parcel-bundler')
const copy = require('./index')

test('should copy static dir', async () => {
  let bundler = new Bundler('./demo/index.html', {
    outDir: path.join(__dirname, 'dist'),
    watch: false,
    cache: false,
    hmr: false,
    logLevel: 0
  })
  copy(bundler)
  await bundler.bundle()

  setTimeout(() => {
    const files = fs.readdirSync('dist/mock')
    console.log(files)
    expect(files.includes('config.json')).toBeTruthy()
  }, 320)
})
