> Copy static dir to your bundle dir

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#License)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com).

```sh
$ npm install --dev-save parcel-plugin-copy
$ # OR
$ yarn add --dev parcel-plugin-copy
```

## Usage

Add a `staticPath` property to your `package.json`. See [package.json](package.json) for example or as follows:

```json
  staticPath: {
    "source": "/source/dir",
    "target": "/target/dir",
    "typeFiles": "styles.css.map"
  }
```

# OR

```json
  staticPath: {
    "source": "['/source/dir','/source/static']",
    "target": "['/target/dir','/target/static']",
    "typeFiles": "styles.css.map, *.css, *.js" //or you can completely remove the parameter (typeFiles), then all files from the specified directories will be transferred
  },
```

## Contribute

1. Fork it and create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -am 'Add some feature'
3. Push to the branch: git push origin my-new-feature
4. Submit a pull request

## License

MIT
