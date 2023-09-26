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

  meter.on('dataavailable', function (event: MeterEvent) {
    onData(event.data.mode, event.data.value)
  })

  meter.start()
}
