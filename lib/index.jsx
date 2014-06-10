/** @jsx React.DOM */

var HelloPage = require('./hello.jsx')
  , MainApp = require('./main')
  , Header = require('./header.jsx')
  , Importer = require('./importer.jsx')

  , Model = require('treed/skins/workflowy/model')
  , Controller = require('treed/skins/workflowy/controller')

  , loadModel = require('./load-model')

var NotableMind = module.exports = React.createClass({
  displayName: 'NotableMind',
  getDefaultProps: function () {
    return {
      backs: {}
    }
  },

  getInitialState: function () {
    return {
      backType: null,
      loadingModel: false,
      model: null,
      nm: null
    }
  },

  onChangeBack: function (back, backType) {
    this.setState({
      loadingModel: true,
      backType: backType
    })

    loadModel(back, Model, function (err, model) {
      if (err) {
        return this.setState({
          loadingModel: false,
          modelError: err,
          model: null,
          nm: null
        })
      }

      var nm = window.controller = new Controller(model)

      this.setState({
        loadingModel: false,
        modelError: null,
        model: model,
        nm: nm
      })
    }.bind(this))
  },

  getDataDump: function () {
    return this.state.nm.exportData()
  },

  _onLogout: function () {
    if (this.state.nm) {
      // this.state.nm.destroy()
    }
    this.setState({nm: null, backType: null})
    localStorage._notablemind_backend = null
  },

  _onClickImport: function () {
    this.setState({
      importing: true
    })
  },

  // filename: string
  // data: look at model.importData for more info
  // options:
  // - not sure about options just yet.
  _onLoadImport: function (filename, data, options) {

    var now = new Date()
      , content = 'Imported on ' + now.toLocaleDateString() +
               ' at ' + now.toLocaleTimeString() +
               ' from ' + filename

    this.state.nm.importData({
      meta: {
        done: false
      },
      content: content,
      collapsed: false,
      children: [data]
    })
  },

  render: function () {
    if (this.state.loadingModel) {
      return (
        <div className='notablemind'>
          Loading...
        </div>
      )
    }
    if (!this.state.nm) {
      return (
        <div className='notablemind'>
          <HelloPage onReady={this.onChangeBack} backs={this.props.backs}/>
        </div>
      )
    }

    return (
      <div className='notablemind'>
        <Header back={this.state.nm.model.db}
          backType={this.state.backType}
          backs={this.props.backs}
          onLogout={this._onLogout}
          onImport={this._onLoadImport}
          getDataDump={this.getDataDump}/>
        <MainApp
            ref="app"
            nm={this.state.nm}/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:
