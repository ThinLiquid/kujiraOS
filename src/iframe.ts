import runtimeUrl from './util/iframe-runtime.ts?url'

export class EventHandle {
  private events: {
    [key: string]: { pid: number, listener: (args: any) => any }[]
  } = {}

  on(pid: number, eventName: string, listener: (args: any) => any) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push({ pid, listener });
  }

  off(pid: number, eventName: string, listenerToRemove: (args: any) => any) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      x => (x.listener !== listenerToRemove) && (x.pid === pid)
    );
  }

  emit(pid: number, eventName: string, args: any) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach(x => {
      if (x.pid === pid) x.listener(args);
    });
  }
}

window.handle = new EventHandle()

export const createIFrame = (pid: number, script: string, args: any[]): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');

  iframe.srcdoc = `
  <script>window.pid = ${pid}</script>
  <script src="${runtimeUrl}" data-url="${script}"></script>
  `

  iframe.style.display = 'none'

  document.body.appendChild(iframe)

  iframe.contentWindow!.args = args

  return iframe
}
