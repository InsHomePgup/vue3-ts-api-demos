/**
 * 自定义Promise实现，遵循Promise A+规范
 */
class MyPromise {
  // Promise的三种状态
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  // 成功时的值
  private value: any
  // 失败时的原因
  private reason: any
  // 成功回调队列
  private onFulfilledCallbacks: any[] = []
  // 失败回调队列
  private onRejectedCallbacks: any[] = []

  /**
   * 构造函数
   * @param executor 执行器函数，接收resolve和reject两个参数
   */
  constructor(executor: (resolve: (value: any) => void, reject: (reason: any) => void) => void) {
    try {
      // 立即执行executor
      executor(this.resolve.bind(this), this.reject.bind(this))
    }
    catch (error) {
      // 如果executor执行出错，直接reject
      this.reject(error)
    }
  }

  /**
   * 内部resolve方法
   * @param value 成功时的值
   */
  private resolve(value: any): void {
    // 状态只能从pending变为其他
    if (this.state !== 'pending') {
      return
    }
    this.state = 'fulfilled'
    this.value = value
    // 执行所有成功回调
    this.onFulfilledCallbacks.forEach(callback => callback())
  }

  /**
   * 内部reject方法
   * @param reason 失败时的原因
   */
  private reject(reason: any): void {
    // 状态只能从pending变为其他
    if (this.state !== 'pending') {
      return
    }
    this.state = 'rejected'
    this.reason = reason
    // 执行所有失败回调
    this.onRejectedCallbacks.forEach(callback => callback())
  }

  /**
   * then方法实现，遵循Promise A+规范
   * @param onFulfilled 成功回调
   * @param onRejected 失败回调
   * @returns 返回新的Promise
   */
  then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): MyPromise {
    // 返回新的Promise
    const promise2 = new MyPromise((resolve, reject) => {
      // 处理成功状态
      const handleFulfilled = () => {
        try {
          // 如果onFulfilled不是函数，值穿透
          const x = onFulfilled ? onFulfilled(this.value) : this.value
          // 解析Promise
          this.resolvePromise(promise2, x, resolve, reject)
        }
        catch (error) {
          reject(error)
        }
      }

      // 处理失败状态
      const handleRejected = () => {
        try {
          if (onRejected) {
            // 执行失败回调
            const x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          }
          else {
            // 如果没有失败回调，直接reject
            reject(this.reason)
          }
        }
        catch (error) {
          reject(error)
        }
      }

      // 根据当前状态执行不同逻辑
      if (this.state === 'fulfilled') {
        // 异步执行
        setTimeout(handleFulfilled, 0)
      }
      else if (this.state === 'rejected') {
        // 异步执行
        setTimeout(handleRejected, 0)
      }
      else {
        // 如果是pending状态，将回调加入队列
        this.onFulfilledCallbacks.push(() => setTimeout(handleFulfilled, 0))
        this.onRejectedCallbacks.push(() => setTimeout(handleRejected, 0))
      }
    })

    return promise2
  }

  /**
   * Promise解析过程，遵循Promise A+规范
   * @param promise 当前Promise
   * @param x 返回值
   * @param resolve resolve函数
   * @param reject reject函数
   */
  private resolvePromise(
    promise: MyPromise,
    x: any,
    resolve: (value: any) => void,
    reject: (reason: any) => void,
  ): void {
    // 避免循环引用
    if (promise === x) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }

    // 如果x是Promise
    if (x instanceof MyPromise) {
      x.then(resolve, reject)
    }
    else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      // 如果x是对象或函数
      let then
      try {
        // 获取then方法
        then = x.then
      }
      catch (error) {
        return reject(error)
      }

      // 如果then是函数
      if (typeof then === 'function') {
        let called = false // 防止多次调用
        try {
          then.call(
            x,
            (y) => {
              if (called) {
                return
              }
              called = true
              // 递归解析
              this.resolvePromise(promise, y, resolve, reject)
            },
            (r) => {
              if (called) {
                return
              }
              called = true
              reject(r)
            },
          )
        }
        catch (error) {
          if (called) {
            return
          }
          reject(error)
        }
      }
      else {
        // 普通值直接resolve
        resolve(x)
      }
    }
    else {
      // 普通值直接resolve
      resolve(x)
    }
  }

  /**
   * catch方法
   * @param onRejected 失败回调
   * @returns 返回新的Promise
   */
  catch(onRejected: (reason: any) => any): MyPromise {
    return this.then(undefined, onRejected)
  }

  /**
   * 静态resolve方法
   * @param value 解析的值
   * @returns 返回已解析的Promise
   */
  static resolve(value: any): MyPromise {
    return new MyPromise(resolve => resolve(value))
  }

  /**
   * 静态reject方法
   * @param reason 拒绝的原因
   * @returns 返回已拒绝的Promise
   */
  static reject(reason: any): MyPromise {
    return new MyPromise((_, reject) => reject(reason))
  }

  /**
   * 静态all方法
   * @param promises Promise数组
   * @returns 返回新的Promise
   */
  static all(promises: MyPromise[]): MyPromise {
    return new MyPromise((resolve, reject) => {
      const results: any[] = []
      let count = 0

      // 遍历所有Promise
      promises.forEach((promise, index) => {
        promise.then(
          (value) => {
            // 保持结果顺序
            results[index] = value
            count++
            // 当所有Promise都完成时resolve
            if (count === promises.length) {
              resolve(results)
            }
          },
          // 任何一个Promise失败就reject
          reject,
        )
      })
    })
  }

  /**
   * 静态race方法
   * @param promises Promise数组
   * @returns 返回新的Promise
   */
  static race(promises: MyPromise[]): MyPromise {
    return new MyPromise((resolve, reject) => {
      // 任何一个Promise完成或失败就resolve/reject
      promises.forEach((promise) => {
        promise.then(resolve, reject)
      })
    })
  }
}

export default MyPromise

function proA() {
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

proA().then((res) => {
  console.log(res)
})
