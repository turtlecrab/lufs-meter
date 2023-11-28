// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LoudnessMeter } from '@domchristie/needles'

import type { MeterEvent, MeterMode } from './types'

export function measure(
  source: AudioBufferSourceNode,
  onData: (mode: MeterMode, value: number) => void,
) {
  const meter = new LoudnessMeter({
    source,
    modes: ['integrated', 'short-term'],
    workerUri: '/needles-worker.js',
  })

  let isIntegratedDone = false

  meter.on('dataavailable', function (event: MeterEvent) {
    onData(event.data.mode, event.data.value)

    // hack to unload the worker after all measurements are done
    // cuz needles library doesn't have any proper way to do it.
    // the last short-term event fires after the integrated event,
    // so we can't unload the worker immediately
    // TODO
    if (event.data.mode === 'integrated') {
      isIntegratedDone = true
    }
    if (isIntegratedDone && event.data.mode === 'short-term') {
      const worker = meter._workerAdapter.worker as Worker
      worker.terminate()
    }
  })

  meter.start()
}
