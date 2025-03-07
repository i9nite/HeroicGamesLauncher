import { existsSync, readFileSync } from 'graceful-fs'

import { UserInfo } from '../types'
import { clearCache } from '../utils'
import { userInfo } from '../constants'
import { logError, logInfo, LogPrefix } from '../logger/logger'
import { userInfo as user } from 'os'
import Store from 'electron-store'
import { session } from 'electron'
import { getLegendaryCommand, runLegendaryCommand } from './library'

const configStore = new Store({
  cwd: 'store'
})

export class LegendaryUser {
  public static async login(sid: string) {
    const commandParts = ['auth', '--sid', sid]
    const command = getLegendaryCommand(commandParts)
    logInfo(['Logging with Legendary:', command], LogPrefix.Legendary)

    const res = await runLegendaryCommand(commandParts)

    if (res.error) {
      logError(
        ['Failed to login with Legendary:', res.error],
        LogPrefix.Legendary
      )
      return
    }
    this.getUserInfo()
  }

  public static async logout() {
    const commandParts = ['auth', '--delete']
    const command = getLegendaryCommand(commandParts)
    logInfo(['Logging out:', command], LogPrefix.Legendary)

    const res = await runLegendaryCommand(commandParts)

    if (res.error) {
      logError(['Failed to logout:', res.error], LogPrefix.Legendary)
    }

    const ses = session.fromPartition('persist:epicstore')
    await ses.clearStorageData()
    await ses.clearCache()
    await ses.clearAuthCache()
    await ses.clearHostResolverCache()
    configStore.clear()
    clearCache()
  }

  public static isLoggedIn() {
    return existsSync(userInfo)
  }

  public static async getUserInfo(): Promise<UserInfo> {
    if (LegendaryUser.isLoggedIn()) {
      const info = {
        ...JSON.parse(readFileSync(userInfo, 'utf-8')),
        user: user().username
      }
      configStore.set('userInfo', info)
      return info
    }
    configStore.delete('userInfo')
    return { account_id: '', displayName: null }
  }
}
