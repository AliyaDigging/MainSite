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
