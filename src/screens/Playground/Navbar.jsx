import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
const NavbarContainer = styled.div`
  height: ${({isFullScreen}) => isFullScreen ? '0' : '4.5rem'};
  overflow: hidden;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.35);
`

const NavbarContent = styled.button`
  background: transparent;
  border: 0;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`

const Logo = styled.img`
  width: 52px;
  height: auto;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.25));
`

const MainHeading = styled.h1`
  font-size: 1.65rem;
  font-weight: 400;
  color: #f8fafc;
  letter-spacing: -0.02em;

  span{
    font-weight: 700;
    background: linear-gradient(90deg, #22d3ee, #38bdf8);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`

const Navbar = ({ isFullScreen }) => {
  const navigate = useNavigate()
  return (
    <NavbarContainer isFullScreen={isFullScreen}>
      <NavbarContent onClick={() => {
        navigate('/')
      }}>
        <Logo src={logo} />
        <MainHeading>
          <span>Compile</span>X
        </MainHeading>
      </NavbarContent>
    </NavbarContainer>
  )
}

export default Navbar