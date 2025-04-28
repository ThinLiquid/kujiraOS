if (window.top == null) throw new Error('Not running in a cross-origin environment. Aborting.')

const script = document.currentScript
if (script == null) throw new Error('The current script element was not found. Aborting.')
const url = document.currentScript?.dataset.url
if (url == null) throw new Error('Script URL was not found. Aborting.')

class System {
  constructor() {}

  requestNewWindow(type: 'window' | 'layer', zIndex?: 'top' | 'bottom'): ShadowRoot {
    const win = document.createElement('div')
    win.dataset.type = type
    win.dataset.pid = window.pid.toString()

    if (zIndex == 'top') win.style.zIndex = '99999999999999'
    else if (zIndex == 'bottom') win.style.zIndex = '-1'

    window.top!.document.body.appendChild(win)
    return win.attachShadow({ mode: 'open' })
  }
}

;(async () => {
  const thingsToBeNull = [
    'emit',
    'script',
    'url',
    'top',
    'parent'
  ].reduce((ac,a) => ({...ac,[a]: null}),{});

  const fakeWindow = { top: window, parent: window }

  const { HTML } = await import('../lib/HTML.ts')

  const context = {
    ...thingsToBeNull,

    window: fakeWindow,
    globalThis: fakeWindow,
    self: fakeWindow,

    System: new System(),
    HTML: HTML,
  }

  const injectedCode = `
    const RealFunction = Function;
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
    const AsyncGeneratorFunction = Object.getPrototypeOf(async function*() {}).constructor;

    delete Function.prototype.constructor;
    Object.defineProperty(Function.prototype, 'constructor', {
      get() { throw new Error('Access to Function.prototype.constructor is disallowed'); },
      configurable: false
    });

    delete AsyncFunction.prototype.constructor;
    Object.defineProperty(AsyncFunction.prototype, 'constructor', {
      get() { throw new Error('Access to AsyncFunction.prototype.constructor is disallowed'); },
      configurable: false
    });

    delete GeneratorFunction.prototype.constructor;
    Object.defineProperty(GeneratorFunction.prototype, 'constructor', {
      get() { throw new Error('Access to GeneratorFunction.prototype.constructor is disallowed'); },
      configurable: false
    });

    delete AsyncGeneratorFunction.prototype.constructor;
    Object.defineProperty(AsyncGeneratorFunction.prototype, 'constructor', {
      get() { throw new Error('Access to AsyncGeneratorFunction.prototype.constructor is disallowed'); },
      configurable: false
    });
  `

  const fn = (async function() {}).constructor(
    ...Object.keys(context),
    `${injectedCode}\n${await (await fetch(url)).text()}`
  )

  fn(...Object.values(context))
})()
