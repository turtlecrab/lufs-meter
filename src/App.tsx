import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'

import FileInput from './components/FileInput'
import Results from './components/Results'
import { measure } from './lib/measure'
import type { MeterMode, TrackData } from './lib/types'

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
  const [data, setData] = useState<TrackData[]>([])

  useEffect(() => {
    if (data.length < files.length) {
      files.slice(data.length).forEach((file, index) => {
        const dataIndex = data.length + index

        setData(prev => [...prev, { status: 'pending', short: [] }])

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

              const onDataRecieved = (mode: MeterMode, value: number) => {
                if (mode === 'integrated') {
                  setData(prev => {
                    return [...prev].map((v, i) =>
                      i === dataIndex
                        ? {
                            ...v,
                            status: 'measured',
                            integrated: value,
                            isMono: buffer.numberOfChannels === 1,
                          }
                        : v,
                    )
                  })
                } else if (mode === 'short-term') {
                  setData(prev => {
                    return [...prev].map((v, i) =>
                      i === dataIndex
                        ? {
                            ...v,
                            short: [...v.short, value],
                          }
                        : v,
                    )
                  })
                }
              }

              measure(source, onDataRecieved)
            })
        }
      })
    }
  }, [files, data])

  return (
    <>
      <Header>LUFS meter</Header>
      <FileInput setFiles={setFiles} />
      <Results files={files} data={data} />
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
