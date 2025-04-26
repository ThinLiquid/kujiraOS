if (window.top == null) throw new Error('Not running in an IFrame...')

const script = document.currentScript
if (script == null) throw new Error('currentScript was not found.')
const url = document.currentScript?.dataset.url
if (url == null) throw new Error('scriptUrl was not found.')

const emit = (eventName: string, args: any) => window.top!.handle.emit(window.pid, eventName, args) 

class System {
  constructor() {}

  setWindowState(state: 'hidden' | 'visible') {
    emit('state', state)
  }
}

;(async () => {
  const thingsToBeNull = [
    'emit',
    'script',
    'url'
  ]

  const fakeWindow = { ...window, top: window, parent: window }

  const fn = new Function(
    ...thingsToBeNull,
    'window',
    'System',
    await (await fetch(url)).text()
  )

  fn(
    ...(thingsToBeNull.map(_ => null)),
    fakeWindow,
    new System()
  )
})()
