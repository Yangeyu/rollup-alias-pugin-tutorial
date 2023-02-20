import { describe, it, expect } from 'vitest'
import aliasPath from '.'

describe('options类型为object类型', () => {
  const o = aliasPath({
    options: {
      '@': './utils'
    }
  })
  it('alias replace', () => {
    expect((o.resolveId as any)('@/sss')).toMatchInlineSnapshot('"./utils/sss"')
  })
})

describe('options类型为array', () => {
  const o = aliasPath({
    options: [
      {
        alias: '@',
        replacement: './utils'
      }
    ]
  })

  it('alias replace', () => {
    expect((o.resolveId as any)('@/sss')).toMatchInlineSnapshot('"./utils/sss"')
  })

})
