import { decode,cast } from '../src/decode'

describe('decode', () => {
  describe('decode', () => {
    test('decodes ascii bytes', () => {
      expect(decode('a')).toEqual('a')
    })

    test('decodes empty string', () => {
      expect(decode('')).toEqual('')
    })

    test('decodes null value', () => {
      expect(decode(null)).toEqual('')
    })

    test('decodes undefined value', () => {
      expect(decode(undefined)).toEqual('')
    })

    test('decodes unicode characters', () => {
      expect(decode('你好')).toEqual('你好')
    })

    test('decodes multi-byte characters', () => {
      expect(decode('\xF0\x9F\xA4\x94')).toEqual('🤔')
    })
  })

  describe('cast', () => {

  })

})
