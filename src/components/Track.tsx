import { memo } from 'react'
import styled from 'styled-components'

import { formatDuration } from '../lib/utils'
import { useAppSelector } from '../store/store'
import WaveSurferPlayer from './WaveSurferPlayer'
import Spinner from './Spinner'

interface Props {
  index: number
}

const Track = memo(({ index }: Props) => {
  const track = useAppSelector(state => state.lufs.data[index])

  return (
    <Container>
      <Header $isError={track.status === 'error'}>
        {track.isMono && <MonoPill>mono</MonoPill>} <Name>{track.name}</Name>{' '}
        <Duration>{track.duration && formatDuration(track.duration)}</Duration>{' '}
        <Size>{(track.size / (1024 * 1024)).toFixed(2)} Mb</Size>{' '}
      </Header>
      {track.status !== 'error' ? (
        <Wrapper>
          <DataList>
            <DataItem>
              Integrated{' '}
              <strong>
                {track.integrated ? track.integrated.toFixed(1) : <Spinner />}
              </strong>
            </DataItem>
            <DataItem>
              Short-term{' '}
              <strong>
                {track.short.length > 0 ? (
                  Math.max(...track.short).toFixed(1)
                ) : (
                  <Spinner />
                )}
              </strong>
            </DataItem>
          </DataList>
          <WaveSurferPlayer
            waveColor="#4dabf7"
            progressColor="#1864ab"
            url={track.url}
          />
        </Wrapper>
      ) : (
        <div style={{ fontSize: '32px' }}>❌</div>
      )}
    </Container>
  )
})

const Container = styled.article`
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
`

const Header = styled.header<{ $isError: boolean }>`
  margin: 24px 0 4px;
  font-weight: bold;

  ${p => p.$isError && 'color: red;'}
`

const Name = styled.span`
  font-size: 28px;
`

const Size = styled.span`
  color: #adb5bd;
  font-size: 16px;
`

const Duration = styled.span`
  color: #dee2e6;
  font-size: 16px;
`

const MonoPill = styled.span`
  display: inline-block;
  background-color: #e64980;
  color: black;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 28px;
`

const Wrapper = styled.div`
  background-color: #212529;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  @media ${p => p.theme.SM} {
    flex-direction: row;
  }
`

const DataList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px 8px;

  @media ${p => p.theme.SM} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`

const DataItem = styled.li`
  @media ${p => p.theme.SM} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: #ced4da;
  }

  & > strong {
    font-size: 24px;
    color: white;
  }
`

export default Track
