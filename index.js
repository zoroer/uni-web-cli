#!/usr/bin/env node

// native
const { join } = require('node:path')

// 三方
const { program } = require('commander')
const prompts = require('prompts');
const { readJsonSync } = require('fs-extra')

const templateConf = require('./template')
const rootPath = process.cwd()

const pkgFile = join(rootPath, '/package.json')
const { name, version, description } = readJsonSync(pkgFile)

program
  .name(name)
  .description(description)
  .version(version)
  .showHelpAfterError('(add --help for additional information)')

program
  .command('init')
  .alias('create')
  .description('展示支持的项目模板列表')
  .action(async () => {
    // 模板选择
    const { type } = await prompts({
      type: 'select',
      name: 'type',
      message: '请选择你需要使用的项目模板',
      choices: Object.values(templateConf)
    })
    const { choseAction, repositoryUrl } = templateConf[type]

    // 项目名称
    const { dest } = await prompts({
      type: 'text',
      name: 'dest',
      message: '请输入项目名称',
      validate: text => text.trim() ? true : '项目名不能为空!'
    })

    if (dest?.trim()) {
      choseAction(dest, repositoryUrl)
    }
  })

program.parse()
