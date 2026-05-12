import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0 0.25rem;
`

const Ring = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  animation: ${spin} 0.75s linear infinite;
`

const Text = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-muted);
`

const Loading = () => {
  return (
    <Wrap>
      <Ring aria-hidden />
      <Text>Running your code…</Text>
    </Wrap>
  )
}

export default Loading;