import styled from 'styled-components'
import { Dialog } from '@headlessui/react'

interface Props {
  open: boolean
  onClose: () => void
}

function InfoModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Container>
        <Dialog.Panel>
          <Panel>
            <List>
              <li>
                Files are measured in the browser, nothing is sent to the server
              </li>
              <li>Mono files are treated as double mono</li>
              <li>
                Adding a lot of files can eat a lot of RAM and even freeze the
                page (to be fixed)
              </li>
            </List>
            <Button onClick={onClose}>OK</Button>
          </Panel>
        </Dialog.Panel>
      </Container>
    </Dialog>
  )
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: #000000c0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`

const Panel = styled.div`
  background-color: white;
  color: black;
  min-width: 300px;
  max-width: 500px;
  padding: 32px;
  margin: 16px;
  border-radius: 16px;
`

const List = styled.ul`
  /* list-style: none; */
  padding-left: 16px;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;

  & > li {
    margin-bottom: 8px;
  }
`

const Button = styled.button`
  display: block;
  margin: 32px auto 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  padding: 4px 16px;
`

export default InfoModal
