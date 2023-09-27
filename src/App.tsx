import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'

import FileInput from './components/FileInput'
import Results from './components/Results'
import { measure } from './lib/measure'
import type { MeterMode } from './lib/types'
import { useAppDispatch, useAppSelector } from './store/store'
import {
  addPendingTrack,
  setTrackError,
  updateDecodedData,
  updateLufsData,
} from './store/lufsSlice'

function App() {
  const actxRef = useRef<AudioContext>()

  useEffect(() => {
    const actx = new AudioContext()
    actxRef.current = actx

    return () => {
      actx.close()
    }
  }, [])

  const [files, setFiles] = useState<File[]>([])

  const dataLength = useAppSelector(state => state.lufs.data.length)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!actxRef.current) return
    if (dataLength === files.length) return

    for (let index = dataLength; index < files.length; index++) {
      const file = files[index]

      const url = URL.createObjectURL(file)

      dispatch(addPendingTrack({ name: file.name, size: file.size, url }))

      fetch(url)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => actxRef.current!.decodeAudioData(arrayBuffer))
        .then(buffer => {
          const offlineCtx = new OfflineAudioContext(
            buffer.numberOfChannels,
            buffer.length,
            buffer.sampleRate,
          )
          const source = offlineCtx.createBufferSource()
          source.buffer = buffer

          dispatch(
            updateDecodedData({
              index,
              duration: buffer.duration,
              isMono: buffer.numberOfChannels === 1,
            }),
          )

          const onDataAvailable = (mode: MeterMode, value: number) => {
            dispatch(updateLufsData({ index, mode, value }))
          }
          measure(source, onDataAvailable)
        })
        .catch(err => {
          console.error(err)
          dispatch(setTrackError({ index }))
        })
    }
  }, [files, dataLength, dispatch])

  return (
    <>
      <Header>LUFS meter</Header>
      <FileInput setFiles={setFiles} />
      <Results />
    </>
  )
}

const Header = styled.h1`
  margin: 0;
  padding: 0.75rem;
  font-size: 2rem;

  font-family: 'Courier New', Courier, monospace;
`

export default App
