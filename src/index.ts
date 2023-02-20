import { Plugin } from 'rollup'
import { AliasConfig, Entries, OptionsArr } from './types'

// 导出的方法
export default function aliasPath (config: AliasConfig): Plugin {
  const entries = normalizeOptions(config.options)
  return {
    name: 'aliasPath',
    resolveId (source: string) {
      const entry = entries.find(e => e.match(source))
      entry && (source = entry.replace(source))
      return source
    }
  }
}

const objectToString = Object.prototype.toString
const isOpitionsArr = 
  (target: Record<string, any> | OptionsArr): target is OptionsArr  => Array.isArray(target)
// 标准化参数
const normalizeOptions = (options: AliasConfig['options']) => {
  const entries: Entries = []
  if (objectToString.call(options) === '[object Object]') {
    Object.entries(options).forEach(([k, v]) => entries.push(new Entry(k, v)))
  }
  if (isOpitionsArr(options)) {
    options.forEach(i => entries.push(new Entry(i.alias, i.replacement)))
  }
  return entries
}

class Entry {
  constructor(private alias: string, private replacement: string) {}
  match (target: string) {
    return target.startsWith(this.alias)
  }
  replace (target: string) {
    return target.replace(this.alias, this.replacement)
  }
}
