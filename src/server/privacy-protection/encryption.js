const encryptValue = (value, array) => {
  let index

  do {
    index = Math.floor(Math.random() * array.length)
  } while (value === array[index])

  return {
    value,
    eValue: array[index]
  }
}

const decryptValue = (eValue, dict) => {
  const results = dict.filter(pair => pair.eValue === eValue)
  if (results.length) {
    return results[0].value
  } else {
    return null
  }
}

export {encryptValue, decryptValue}