import styled from 'styled-components'

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
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 32 32"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 15 4 L 15 20.5625 L 9.71875 15.28125 L 8.28125 16.71875 L 15.28125 23.71875 L 16 24.40625 L 16.71875 23.71875 L 23.71875 16.71875 L 22.28125 15.28125 L 17 20.5625 L 17 4 Z M 7 26 L 7 28 L 25 28 L 25 26 Z"></path>
        </svg>
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
