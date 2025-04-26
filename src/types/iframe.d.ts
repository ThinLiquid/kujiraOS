import { EventHandle } from "../iframe";

declare global {
  interface Window {
    // main runtime sided
    handle: EventHandle

    // iframe runtime sided
    pid: number
  }
}

