
var Gorilla = require('itreed/lib/kernels/gorilla')
  , IPython = require('itreed/lib/kernels/ipython')
  , IJS = require('itreed/lib/kernels/js')
  , Rust = require('itreed/lib/kernels/rust')
  , Go = require('itreed/lib/kernels/go')

module.exports = {
  null: {
    title: 'None',
  },
  'ipython': {
    type: 'ipython',
    language: 'python',
    remote: true,
    title: 'Python',
    kernel: IPython,
  },
  'gorilla': {
    type: 'gorilla',
    language: 'clojure',
    remote: true,
    title: 'Clojure',
    kernel: Gorilla,
  },
  'ijulia': {
    type: 'ipython',
    language: 'julia',
    remote: true,
    title: 'Julia',
    kernel: IPython,
  },
  'ijs': {
    type: 'ijs',
    language: 'javascript',
    remote: false,
    title: 'Javascript',
    kernel: IJS,
  },
  'rust': {
    type: 'rust',
    language: 'rust',
    remote: true,
    title: 'Rust',
    kernel: Rust,
  },
  'go': {
    type: 'go',
    language: 'go',
    remote: true,
    title: 'Go',
    kernel: Go,
  }
}

