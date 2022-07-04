export type TModalConfig = {
  width?: string,
  enterAnimationDuration: string,
  exitAnimationDuration: string
}

export type TConfirmData = {
  title: string
}

export type TConfirmModalConfigData = {
  data: TConfirmData
}

export type TModalConfigs = TModalConfig & TConfirmModalConfigData
