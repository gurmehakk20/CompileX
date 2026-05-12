import React from 'react'
import styled from 'styled-components'
import { BiImport } from 'react-icons/bi'
export const Console = styled.div`
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--color-border);
  min-height: 0;

  &:last-child {
    border-bottom: none;
  }
`

export const Header = styled.div`
  background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
  height: 3.25rem;
  padding: 0 1rem;
  z-index: 2;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.35);
  input{
    display: none;
  }
  label, a{
    font-weight: 500;
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: #cbd5e1;
    padding: 0.35rem 0.55rem;
    border-radius: var(--radius-sm);
    transition: background 0.15s ease, color 0.15s ease;
  }
  label:hover, a:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #f8fafc;
  }
`

export const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: 0;
  outline: 0;
  padding: 0.65rem 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.55;
  min-height: 220px;
  background: #f8fafc;
  color: #0f172a;

  &:disabled {
    opacity: 0.92;
    cursor: default;
  }
`
const InputConsole = ({ currentInput, setCurrentInput, getFile }) => {
  return (
    <Console>
      <Header>
        Input: 
        <label htmlFor="inputfile">
          <input type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrentInput)} /> <BiImport /> Import Input
        </label>
      </Header>
      <TextArea
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
      />
    </Console>
  )
}

export default InputConsole