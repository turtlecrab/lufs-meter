import styled from 'styled-components'

import { formatDuration } from '../lib/utils'
import { useAppSelector } from '../store/store'

function Results() {
  const data = useAppSelector(state => state.lufs.data)

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
        {data.map((track, index) => (
          <tr
            key={index}
            style={track.status === 'error' ? { color: 'red' } : {}}
          >
            <td>{track.name}</td>
            <td>{(track.size / (1024 * 1024)).toFixed(2)} Mb</td>
            <td>{track.duration && formatDuration(track.duration)}</td>
            <td>{track.integrated?.toFixed(1)}</td>
            <td>
              {track.short.length > 0 && Math.max(...track.short).toFixed(1)}
            </td>
            <td>
              {track.isMono !== undefined && (track.isMono ? 'Yes' : 'No')}
            </td>
          </tr>
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
