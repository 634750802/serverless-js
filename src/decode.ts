import { Field } from './index.js'

const decoder = new TextDecoder('utf-8')

export function decode(text: string | null): string {
  return text ? decoder.decode(Uint8Array.from(bytes(text))) : ''
}

function bytes(text: string): number[] {
  return text.split('').map((c) => c.charCodeAt(0))
}

export function cast(field: Field, value: string | null): any {
  if (isNull(value, field)) {
    return null
  }

  switch (field.type) {
    // bool will be converted to TINYINT
    case 'TINYINT':
    case 'UNSIGNED TINYINT':
    case 'SMALLINT':
    case 'UNSIGNED SMALLINT':
    case 'MEDIUMINT':
    case 'INT':
    case 'UNSIGNED INT':
    case 'YEAR':
      return parseInt(value, 10)
    case 'FLOAT':
    case 'DOUBLE':
      return parseFloat(value)
    // set and enum will be converted to char.
    case 'BIGINT':
    case 'UNSIGNED BIGINT':
    case 'DECIMAL':
    case 'CHAR':
    case 'VARCHAR':
    case 'BINARY':
    case 'VARBINARY':
    case 'TINYTEXT':
    case 'TEXT':
    case 'MEDIUMTEXT':
    case 'LONGTEXT':
    case 'TINYBLOB':
    case 'BLOB':
    case 'MEDIUMBLOB':
    case 'LONGBLOB':
    case 'DATE':
    case 'TIME':
    case 'DATETIME':
    case 'TIMESTAMP':
    case 'BIT':
      return value
    case 'JSON':
      return JSON.parse(decode(value))
    default:
      return decode(value)
  }
}

function isNull(value, field: Field): boolean {
  if (value === null) {
    return true
  }
  if (value != '') {
    return false
  }

  switch (field.type) {
    case 'TINYINT':
    case 'UNSIGNED TINYINT':
    case 'SMALLINT':
    case 'UNSIGNED SMALLINT':
    case 'MEDIUMINT':
    case 'INT':
    case 'UNSIGNED INT':
    case 'YEAR':
    case 'FLOAT':
    case 'DOUBLE':
    case 'BIGINT':
    case 'UNSIGNED BIGINT':
    case 'DECIMAL':
    case 'DATE':
    case 'TIME':
    case 'DATETIME':
    case 'TIMESTAMP':
    case 'JSON':
      return true
    // set and enum will be converted to char.
    case 'CHAR':
    case 'VARCHAR':
    case 'BINARY':
    case 'VARBINARY':
    case 'TINYTEXT':
    case 'TEXT':
    case 'MEDIUMTEXT':
    case 'LONGTEXT':
    case 'TINYBLOB':
    case 'BLOB':
    case 'MEDIUMBLOB':
    case 'LONGBLOB':
    case 'BIT':
      // can not distinguish between empty string and null for nullable fields now.
      return false
    default:
      return false
  }
}
