import { createIFrame } from './iframe';

class Kernel {
  processes = new Map<number, HTMLIFrameElement>();
  pidIndex = 0;

  async spawn(scriptUrl: string, args: any[] = []) {
		const iframe = createIFrame(this.pidIndex, scriptUrl, args)

    this.processes.set(this.pidIndex, iframe)
    this.pidIndex++
	}

	kill(pid: number) {
	  const iframe = this.processes.get(pid);
		if (iframe) {
			iframe.remove()
      document.querySelectorAll(`*[data-pid="${pid}"]`).forEach(x => x.remove())
			this.processes.delete(pid)
		}
	}
}

const kernel = new Kernel();

// init desktop

// load styles
const link = document.createElement('link')
link.href = '/style.css'
link.rel = 'stylesheet'
document.head.appendChild(link)

// retrieve files from server and load into service worker

await kernel.spawn('/system/bin/wallpaper.js', ['wallpaper']);
await kernel.spawn('/system/bin/bar.js')

window.kernel = kernel

