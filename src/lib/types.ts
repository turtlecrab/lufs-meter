export type TrackData = {
  status: 'pending' | 'measured' | 'error'
  integrated?: number
  short: number[]
  isMono?: boolean
  duration?: string
}

export type MeterMode = 'integrated' | 'short-term' | 'momentary'

export type MeterEvent = {
  data: {
    mode: MeterMode
    type: string
    value: number
  }
  type: string
}
