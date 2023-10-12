import styled from 'styled-components'
import { SlSocialGithub } from 'react-icons/sl'

function Header() {
  return (
    <Container>
      <Heading>LUFS meter</Heading>
      <GitHubLink
        href="https://github.com/turtlecrab/lufs-meter"
        aria-label="Github"
      >
        <SlSocialGithub size={28} />
      </GitHubLink>
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

const GitHubLink = styled.a`
  display: flex;
  color: #adb5bd;

  &:hover {
    color: white;
  }
`

export default Header
