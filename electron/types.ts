export type Runner = 'legendary' | 'gog' | 'heroic'

interface About {
  description: string
  shortDescription: string
}

export interface AppSettings {
  checkUpdatesInterval: number
  enableUpdates: boolean
  addDesktopShortcuts: boolean
  addStartMenuShortcuts: boolean
  altLegendaryBin: string
  altGogdlBin: string
  audioFix: boolean
  autoInstallDxvk: boolean
  autoInstallVkd3d: boolean
  autoSyncSaves: boolean
  checkForUpdatesOnStartup: boolean
  customWinePaths: string[]
  darkTrayIcon: boolean
  defaultInstallPath: string
  discordRPC: boolean
  egsLinkedPath: string
  exitToTray: boolean
  enableEsync: boolean
  enableFSR: boolean
  enableFsync: boolean
  enableResizableBar: boolean
  language: string
  launcherArgs: string
  maxRecentGames: number
  maxSharpness: number
  maxWorkers: number
  minimizeOnLaunch: boolean
  nvidiaPrime: boolean
  offlineMode: boolean
  otherOptions: string
  savesPath: string
  showFps: boolean
  showMangohud: boolean
  showUnrealMarket: boolean
  startInTray: boolean
  useGameMode: boolean
  targetExe: string
  userInfo: UserInfo
  wineCrossoverBottle: string
  winePrefix: string
  defaultWinePrefix: string
  wineVersion: WineInstallation
  useSteamRuntime: boolean
}

export type ExecResult = {
  stderr: string
  stdout: string
  fullCommand?: string
  error?: string
}

export type LaunchResult = {
  stderr: string
  command: string
  gameSettings: GameSettings
}

export interface ExtraInfo {
  about: About
  reqs: Reqs[]
}

export type GameConfigVersion = 'auto' | 'v0' | 'v0.1'
export interface GameInfo {
  runner: Runner
  store_url: string
  app_name: string
  art_cover: string
  art_logo: string
  art_square: string
  cloud_save_enabled: boolean
  compatible_apps: string[]
  developer: string
  extra: ExtraInfo
  folder_name: string
  install: InstalledInfo
  is_game: boolean
  is_installed: boolean
  is_ue_asset: boolean
  is_ue_plugin: boolean
  is_ue_project: boolean
  namespace: string
  save_folder: string
  title: string
  canRunOffline: boolean
  is_mac_native: boolean
  is_linux_native: boolean
}

type DLCInfo = {
  app_name: string
  title: string
}

type GameInstallInfo = {
  app_name: string
  launch_options: Array<string>
  owned_dlc: Array<DLCInfo>
  title: string
  version: string
  platform_versions: { Mac: string; Windows: string }
  buildId?: string
}

type Prerequisites = {
  args: string
  name: string
  path: string
}

type GameManifest = {
  app_name: string
  disk_size: number
  download_size: number
  install_tags: Array<string>
  launch_exe: string
  prerequisites: Prerequisites
  languages?: Array<string>
  versionEtag?: string
}
export interface InstallInfo {
  game: GameInstallInfo
  manifest: GameManifest
}

export interface GameSettings {
  audioFix: boolean
  autoInstallDxvk: boolean
  autoInstallVkd3d: boolean
  autoSyncSaves: boolean
  enableEsync: boolean
  enableFSR: boolean
  enableFsync: boolean
  enableResizableBar: boolean
  maxSharpness: number
  launcherArgs: string
  nvidiaPrime: boolean
  offlineMode: boolean
  otherOptions: string
  savesPath: string
  showFps: boolean
  showMangohud: boolean
  targetExe: string
  useGameMode: boolean
  useSteamRuntime: boolean
  wineCrossoverBottle: string
  winePrefix: string
  wineVersion: WineInstallation
}

export interface GameStatus {
  appName: string
  progress?: number | null
  status:
    | 'installing'
    | 'updating'
    | 'launching'
    | 'playing'
    | 'uninstalling'
    | 'repairing'
    | 'done'
    | 'canceled'
    | 'moving'
}

export type GlobalConfigVersion = 'auto' | 'v0'
export interface InstallProgress {
  bytes: string
  eta: string
  folder?: string
  percent: string
}
export interface InstalledInfo {
  executable: string | null
  install_path: string | null
  install_size: string | null
  is_dlc: boolean
  version: string | null
  platform: string
  appName?: string
  installedWithDLCs?: boolean // For verifing GOG games
  language?: string // For verifing GOG games
  versionEtag?: string // Checksum for checking GOG updates
  buildId?: string // For verifing GOG games
}
export interface KeyImage {
  type: string
}

export interface Path {
  filePaths: string[]
}

export interface RawGameJSON {
  app_name: string
  art_cover: string
  art_logo: string
  art_square: string
  cloudSaveEnabled: boolean
  developer: string
  executable: string
  extraInfo: ExtraInfo
  folderName: string
  install_path: string
  install_size: number
  isInstalled: boolean
  is_dlc: boolean
  saveFolder: string
  title: string
  version: string
}

interface Reqs {
  minimum: string
  recommended: string
  title: string
}

export type SyncType = 'Download' | 'Upload' | 'Force download' | 'Force upload'

export type UserInfo = {
  account_id?: string
  displayName?: string
  epicId?: string
  name?: string
}
export interface WineInstallation {
  bin: string
  name: string
  type: 'wine' | 'proton' | 'crossover'
  wineboot?: string
  wineserver?: string
}

export interface InstallArgs {
  path: string
  installDlcs?: boolean
  sdlList?: Array<string>
  platformToInstall: 'Windows' | 'Mac' | 'Linux'
  installLanguage?: string
}

export interface InstallParams {
  appName: string
  path: string
  installDlcs?: boolean
  sdlList?: Array<string>
  installLanguage?: string
  runner: Runner
}

export interface GOGLoginData {
  expires_in: number
  access_token: string
  refresh_token: string
  user_id: string
  loginTime: number
}

export interface GOGGameInfo {
  tags: string[]
  id: number
  image: string
  availability: {
    isAvailable: boolean
    isAvailableInAccount: boolean
  }
  title: string
  url: string
  worksOn: {
    Windows: boolean
    Mac: boolean
    Linux: boolean
  }
  category: string
  rating: number
  isComingSoom: boolean
  isGame: boolean
  slug: string
  isNew: boolean
  dlcCount: number
  releaseDate: {
    date: string
    timezone_type: number
    timezone: string
  }
  isBaseProductMissing: boolean
  isHidingDisabled: boolean
  isInDevelopment: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraInfo: any[]
  isHidden: boolean
}

export interface GOGImportData {
  // "appName": "1441974651", "buildId": "55136646198962890", "title": "Prison Architect", "tasks": [{"category": "launcher", "isPrimary": true, "languages": ["en-US"], "name": "Prison Architect", "osBitness": ["64"], "path": "Launcher/dowser.exe", "type": "FileTask"}, {"category": "game", "isHidden": true, "languages": ["en-US"], "name": "Prison Architect - launcher process Prison Architect64_exe", "osBitness": ["64"], "path": "Prison Architect64.exe", "type": "FileTask"}, {"category": "document", "languages": ["en-US"], "link": "http://www.gog.com/support/prison_architect", "name": "Support", "type": "URLTask"}, {"category": "other", "languages": ["en-US"], "link": "http://www.gog.com/forum/prison_architect/prison_break_escape_map_megathread/post1", "name": "Escape Map Megathread", "type": "URLTask"}], "installedLanguage": "en-US"}
  appName: string
  buildId: string
  title: string
  tasks: Array<{
    category: string
    isPrimary?: boolean
    languages?: Array<string>
    arguments?: Array<string> | string
    path: string
    name: string
    type: string
  }>
  installedLanguage: string
  platform: string
  versionName: string
  installedWithDlcs: boolean
}

export interface GamepadInputEventKey {
  type: 'keyDown' | 'keyUp' | 'char'
  keyCode: string
}

export interface GamepadInputEventWheel {
  type: 'mouseWheel'
  deltaY: number
  x: number
  y: number
}

export interface GamepadInputEventMouse {
  type: 'mouseDown' | 'mouseUp'
  x: number
  y: number
  button: 'left' | 'middle' | 'right'
}
