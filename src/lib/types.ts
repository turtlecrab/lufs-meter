export type TrackData = {
  name: string
  status: 'pending' | 'measured' | 'error'
  size: number
  url: string
  duration?: number
  integrated?: number
  short: number[]
  isMono?: boolean
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
