import styled from 'styled-components'
import { LiaDownloadSolid } from 'react-icons/lia'

interface Props {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

function FileInput({ setFiles }: Props) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files) {
      setFiles(prev => {
        return [...prev, ...e.target.files!]
      })
    }
  }

  return (
    <Container>
      <label>
        <LiaDownloadSolid size={40} />
        <br />
        Add audio files
        <input type="file" accept="audio/*" onChange={handleChange} multiple />
      </label>
    </Container>
  )
}

const Container = styled.div`
  & > label {
    margin: 12px 0 24px;
    cursor: pointer;
    border: 2px dashed #adb5bd;
    border-radius: 16px;
    display: block;
    height: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', Courier, monospace;
    font-size: larger;
    font-weight: bold;

    & > input {
      opacity: 0;
      /* display: none; */
      cursor: pointer;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: red;
    }
  }
`

export default FileInput
