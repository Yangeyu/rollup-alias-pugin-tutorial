export type OptionsArr = {alias: string, replacement: string}[]
export type AliasConfig = {
  options: Record<string, any> | OptionsArr
}
export type Entries = {
  match: (target: string) => boolean
  replace: (target: string) => string
}[]
