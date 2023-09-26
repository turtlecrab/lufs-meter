import styled from 'styled-components'

import { useAppSelector } from '../store/store'
import Track from './Track'

function Results() {
  const dataLength = useAppSelector(state => state.lufs.data.length)

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Duration</th>
          <th>Integrated</th>
          <th>Short</th>
          <th>Mono</th>
        </tr>
      </thead>
      <tbody>
        {Array(dataLength)
          .fill(null)
          .map((_, index) => (
            <Track index={index} key={index} />
          ))}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  margin-block: 1rem;

  th,
  td {
    padding: 0.25rem 0.5rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: large;
  }
`

export default Results
