import SandboxWorker from './worker.ts?worker'

class Kernel {
    processes = new Map<number, Worker>();
    pidIndex = 0;

    async spawn(scriptUrl: string) {
			const worker = new SandboxWorker()
			this.processes.set(this.pidIndex, worker)
			this.pidIndex++

			worker.postMessage({ type: 0x00, url: scriptUrl })
		}

		kill(pid: number) {
			const worker = this.processes.get(pid);
			if (worker) {
				worker.terminate();
				this.processes.delete(pid)
			}
		}
}

const kernel = new Kernel();
await kernel.spawn('/test.js');
