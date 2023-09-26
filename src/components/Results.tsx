import styled from 'styled-components'
import type { TrackData } from '../lib/types'

interface Props {
  files: File[]
  data: TrackData[]
}

function Results({ files, data }: Props) {
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
        {files.map((file, index) => (
          <tr
            key={index}
            style={data[index]?.status === 'error' ? { color: 'red' } : {}}
          >
            <td>{file.name}</td>
            <td>{(file.size / (1024 * 1024)).toFixed(2)} Mb</td>
            <td>{data[index]?.duration}</td>
            <td>{data[index]?.integrated?.toFixed(1)}</td>
            <td>
              {data[index] &&
                data[index].short.length > 0 &&
                Math.max(...data[index].short).toFixed(1)}
            </td>
            <td>
              {data[index]?.isMono !== undefined &&
                (data[index].isMono ? 'Yes' : 'No')}
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
