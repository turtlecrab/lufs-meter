import styled from 'styled-components'
import { SlQuestion, SlSocialGithub } from 'react-icons/sl'
import { useState } from 'react'

import InfoModal from './InfoModal'

function Header() {
  const [infoIsOpen, setInfoIsOpen] = useState(false)

  return (
    <Container>
      <Heading>LUFS meter</Heading>
      <Links>
        <Link
          href="https://github.com/turtlecrab/lufs-meter"
          target="_blank"
          aria-label="Github"
        >
          <SlSocialGithub size={28} />
        </Link>
        <Link
          as="button"
          onClick={() => setInfoIsOpen(true)}
          aria-label="Information"
        >
          <SlQuestion size={28} />
        </Link>
      </Links>
      <InfoModal open={infoIsOpen} onClose={() => setInfoIsOpen(false)} />
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Heading = styled.h1`
  margin: 0;
  padding: 12px;
  font-size: xx-large;
  font-family: 'Courier New', Courier, monospace;
`

const Links = styled.div`
  display: flex;
  gap: 8px;
`

const Link = styled.a`
  display: flex;
  color: #adb5bd;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

export default Header
