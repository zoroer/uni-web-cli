
const ora = require('ora')
const chalk = require('chalk')
const prompts = require('prompts')
const download = require('download-git-repo')

const path = require("path");
const { existsSync, rmSync, mkdirSync } = require('fs')
const rootPath = process.cwd()

/**
 * 根据用户输入控制dest项目名行为（是否覆盖同名）
 * @param dest 项目名
 */
const validDest = async (dest) => {
  const destFullPath = path.join(rootPath, '/', dest)
  let outputPath = destFullPath

  if (existsSync(destFullPath)) {
    // 是否覆盖
    const { isCover } = await prompts({
      type: 'toggle',
      name: 'isCover',
      message: `项目${dest}当前目录已存在，是否覆盖重新构建项目？`,
      initial: true,
      active: '覆盖',
      inactive: '不覆盖，项目名后面追加__copy标识'
    })

    if (isCover) {
      rmSync(destFullPath, { recursive: true })
    } else {
      outputPath = path.join(rootPath, '/', dest + '__copy')
    }
  }
  mkdirSync(outputPath)
  return outputPath
}

/**
 * github拉取模板
 * @param dest   项目名
 * @param gitUrl git仓库地址
 */
const cloneFromGit = (dest = './', gitUrl = '') => {
  const preMsg = `正在构建项目${dest}...`
  const failMsg = '项目构建失败，请重试！'

  const spinner = ora(preMsg).start()

  return new Promise((resolve, reject) => {
    download(`direct:${gitUrl}`, dest, { clone: true }, (err) => {
      if (err) {
        spinner.fail(failMsg)
        reject(err)
        return false
      }
      spinner.succeed()
      resolve()
    })
  })
}

/**
 * 安装成功后提示
 * @param dest 项目名
 */
const doneTipsLog = (dest) => {
  const tipsArr = [
    '',
    `  cd ${dest}`,
    `  npm install`,
    `  npm run dev/start`,
    ''
  ]

  // print succeed log
  ora(chalk.green(`项目构建完成，可执行以下命令运行项目：`)).succeed()
  for (const tip of tipsArr) {
    console.log(chalk.green(tip))
  }
}

/**
 * 选择模板之后action
 * @param dest   项目名
 * @param gitUrl git仓库地址
 */
const choseAction = async (dest, gitUrl) => {
  if (!gitUrl) {
    console.log('当前选择类型仓库暂未支持，敬请期待~')
    return false
  }

  try {
    const projectFullPath = await validDest(dest)
    await cloneFromGit(projectFullPath, gitUrl)
    doneTipsLog(dest)
  } catch (err) {
    console.log('')
    console.log(chalk.red('--- 错误信息如下：--- '))
    console.log(err)
  }
}

module.exports = {
  cloneFromGit,
  doneTipsLog,
  choseAction,
  validDest
}
