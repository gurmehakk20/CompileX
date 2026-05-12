import React, {useContext} from 'react'
import styled from 'styled-components'
import { NewFolder, NewPlayground, NewPlaygroundAndFolder, EditFolder, EditPlaygroundTitle, Loading } from './ModalTypes'
import { ModalContext } from '../context/ModalContext'

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;
    background-color: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`

const ModalContent = styled.div`
    background-color: var(--color-surface);
    padding: 1.5rem 1.65rem;
    width: 35%;
    min-width: 300px;
    max-width: 460px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  h2 {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--color-text);
    letter-spacing: -0.01em;
  }
`
export const CloseButton = styled.button`
  background: transparent;
  outline: 0;
  border: 0;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text);
  padding: 0.35rem;
  border-radius: var(--radius-sm);
  transition: background 0.15s ease, color 0.15s ease;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
    font-size: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    color: inherit;
  }

  &:hover {
    background: #f1f5f9;
    color: var(--color-accent);
  }
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1.35rem 0 0;
  gap: 0.85rem;

  input {
    flex-grow: 1;
    min-width: 0;
    height: 2.5rem;
    padding: 0 0.85rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    font-family: inherit;
    background: #fff;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-soft);
  }

  button {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    border: none;
    border-radius: var(--radius-sm);
    height: 2.5rem;
    color: white;
    padding: 0 1.35rem;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

export const ModalTitleBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ModalSubtitle = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-muted);
  margin-top: 0.4rem;
  font-weight: 400;
`;

export const ModalForm = styled.form`
  padding-top: 0.25rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const ModalField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const ModalLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

export const ModalTextInput = styled.input`
  width: 100%;
  height: 2.65rem;
  padding: 0 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-family: inherit;
  background: #fff;
  color: var(--color-text);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-soft);
  }
`;

export const FormSubmitButton = styled.button`
  margin-top: 0.25rem;
  width: 100%;
  height: 2.85rem;
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: inherit;
  background: linear-gradient(135deg, #0891b2, #06b6d4);
  color: #f8fafc;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const modalSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    borderRadius: 10,
    borderColor: state.isFocused ? '#0891b2' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 1px #0891b2' : 'none',
    '&:hover': { borderColor: '#cbd5e1' },
    fontSize: '0.95rem',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(15, 23, 42, 0.12)',
    zIndex: 200,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '0.95rem',
    backgroundColor: state.isSelected ? '#0891b2' : state.isFocused ? '#f1f5f9' : 'white',
    color: state.isSelected ? 'white' : '#0f172a',
  }),
};

const Modal = () => {
  const { isOpenModal } = useContext(ModalContext)
  const { modalType } = isOpenModal;
  // ModalTypes
  // 1: New Folder
  // 2: New Playground
  // 3: New Playground and Folder
  // 4: Rename Folder
  // 5: Rename Playground
  return (
    <ModalContainer>
      <ModalContent>
        {modalType === 1 && <NewFolder />}
        {modalType === 2 && <NewPlayground />}
        {modalType === 3 && <NewPlaygroundAndFolder />}
        {modalType === 4 && <EditFolder />}
        {modalType === 5 && <EditPlaygroundTitle />}
        {modalType === 6 && <Loading />}
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal