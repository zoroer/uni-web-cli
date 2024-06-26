const { choseAction } = require('../helper')

const h5Template = {
  value: 'h5',
  title: 'h5项目',
  description: 'h5项目模板',
  repositoryUrl: 'https://github.com/zoroer/vue3-spa-template.git',
  choseAction
}

const adminTemplate = {
  value: 'admin',
  title: 'admin项目',
  description: 'admin项目模板',
  repositoryUrl: '',
  choseAction
}

const nodeWebTemplate = {
  value: 'node-web',
  title: 'node-web项目',
  description: 'node-web项目模板',
  repositoryUrl: 'https://github.com/zoroer/node-web-template.git',
  choseAction
}

const miniAppTemplate = {
  value: 'mini-app',
  title: 'mini-app项目',
  description: '小程序项目模板',
  repositoryUrl: 'https://github.com/zoroer/mini-app-template.git',
  choseAction
}

module.exports = {
  h5: h5Template,
  admin: adminTemplate,
  'node-web': nodeWebTemplate,
  'mini-app': miniAppTemplate
}


