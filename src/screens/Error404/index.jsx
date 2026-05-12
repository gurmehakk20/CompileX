import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(165deg, #f1f5f9 0%, #e2e8f0 100%);
  color: var(--color-text);
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
`

const Sub = styled.p`
  font-size: 1rem;
  color: var(--color-text-muted);
  max-width: 28rem;
  line-height: 1.6;
`

const Error404 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000)
  }, [navigate])
  return (
    <Wrap>
      <Title>Page not found</Title>
      <Sub>You will be redirected to the home page in a few seconds.</Sub>
    </Wrap>
  )
}

export default Error404