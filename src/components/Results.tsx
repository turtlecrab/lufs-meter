import styled from 'styled-components'

import { useAppSelector } from '../store/store'
import Track from './Track'

function Results() {
  const dataLength = useAppSelector(state => state.lufs.data.length)

  return (
    <List>
      {Array(dataLength)
        .fill(null)
        .map((_, index) => (
          <li key={index}>
            <Track index={index} />
          </li>
        ))}
    </List>
  )
}

const List = styled.ul`
  margin: 16px 0;
  padding: 0;
  list-style: none;
`

export default Results
