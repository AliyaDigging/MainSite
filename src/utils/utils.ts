export function retryUntilItsOk(
  callback: (...args: unknown[]) => unknown,
  retryTimes: number = Number.POSITIVE_INFINITY,
  ...args: unknown[]
): unknown {
  if (retryTimes === Number.POSITIVE_INFINITY) {
    while (1) {
      try {
        return callback(...args)
      } catch (e) {
        console.log(`Func "${callback.name}" runs into an error: ${e}`)
      }
    }
  } else if (retryTimes > 0) {
    for (let i = 0; i < retryTimes; i++) {
      try {
        return callback(...args)
      } catch (e) {
        console.log(`Func "${callback.name}" runs into an error (count ${i + 1}): ${e}`)
        if (i + 1 === retryTimes) {
          // 最后一次的话，就向下传递错误
          throw e
        }
      }
    }
  } else {
    throw RangeError('Should try more than 0 times!')
  }
}

export function getHHMMSSBySeconds(seconds: number) {
  const hour = Math.floor(seconds / 3600)
  const minute = Math.floor((seconds - hour * 3600) / 60)
  const second = seconds - hour * 3600 - minute * 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}
