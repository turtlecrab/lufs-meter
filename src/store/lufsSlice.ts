import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { MeterMode, TrackData } from '../lib/types'

interface LufsState {
  data: TrackData[]
}

const initialState: LufsState = {
  data: [],
}

const lufsSlice = createSlice({
  name: 'lufs',
  initialState,
  reducers: {
    addPendingTrack(
      state,
      action: PayloadAction<{ name: string; size: number; url: string }>,
    ) {
      const { name, size, url } = action.payload
      state.data.push({
        name,
        status: 'pending',
        size,
        short: [],
        url,
      })
    },
    updateDecodedData(
      state,
      action: PayloadAction<{
        index: number
        duration: number
        isMono: boolean
      }>,
    ) {
      const { index, duration, isMono } = action.payload
      state.data[index] = {
        ...state.data[index],
        duration,
        isMono,
      }
    },
    updateLufsData(
      state,
      action: PayloadAction<{ index: number; mode: MeterMode; value: number }>,
    ) {
      const { index, mode, value } = action.payload
      if (mode === 'integrated') {
        state.data[index].status = 'measured'
        state.data[index].integrated = value
      } else if (mode === 'short-term') {
        state.data[index].short.push(value)
      }
    },
    setTrackError(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload
      state.data[index].status = 'error'
    },
  },
})

export default lufsSlice.reducer
export const {
  addPendingTrack,
  updateDecodedData,
  updateLufsData,
  setTrackError,
} = lufsSlice.actions
