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

  const data = useAppSelector(state => state.lufs.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('effect')
    if (data.length < files.length) {
      files.slice(data.length).forEach((file, index) => {
        const dataIndex = data.length + index

        dispatch(addPendingTrack({ name: file.name, size: file.size }))

        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)

        fileReader.onload = e => {
          actxRef.current
            ?.decodeAudioData(e.target?.result as ArrayBuffer)
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
                  index: dataIndex,
                  duration: buffer.duration,
                  isMono: buffer.numberOfChannels === 1,
                }),
              )

              const onDataAvailable = (mode: MeterMode, value: number) => {
                dispatch(updateLufsData({ index: dataIndex, mode, value }))
              }
              measure(source, onDataAvailable)
            })
            .catch(err => {
              console.error(err)
              dispatch(setTrackError({ index: dataIndex }))
            })
        }
      })
    }
  }, [files, data, dispatch])

  return (
    <>
      <Header>LUFS meter</Header>
      <FileInput setFiles={setFiles} />
      <Results data={data} />
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
