import { createIFrame } from './iframe';

class Kernel {
  processes = new Map<number, HTMLIFrameElement>();
  pidIndex = 0;

  async spawn(scriptUrl: string) {
		const iframe = createIFrame(this.pidIndex, scriptUrl)

    this.processes.set(this.pidIndex, iframe)
    this.pidIndex++
	}

	kill(pid: number) {
	  const iframe = this.processes.get(pid);
		if (iframe) {
			iframe.remove()
			this.processes.delete(pid)
		}
	}
}

const kernel = new Kernel();
await kernel.spawn('/test.js');
