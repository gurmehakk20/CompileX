import React, { useContext, useState } from 'react'
import {
  Header,
  CloseButton,
  ModalTitleBlock,
  ModalSubtitle,
  ModalForm,
  ModalField,
  ModalLabel,
  ModalTextInput,
  FormSubmitButton,
  modalSelectStyles,
} from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import Select from 'react-select'

const NewPlayground = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext)
  const { addPlayground } = useContext(PlaygroundContext)

  const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
  ]

  const { folderId } = isOpenModal.identifiers
  const [cardTitle, setCardTitle] = useState('')
  const [language, setLanguage] = useState(languageOptions[0])

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption)
  }

  const trimmedTitle = cardTitle.trim()
  const canSubmit = trimmedTitle.length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    addPlayground(folderId, trimmedTitle, language.value)
    closeModal()
  }

  return (
    <>
      <Header>
        <ModalTitleBlock>
          <h2>New playground</h2>
          <ModalSubtitle>
            Name your playground and choose a language. You can change the language later in the editor.
          </ModalSubtitle>
        </ModalTitleBlock>
        <CloseButton type="button" onClick={() => closeModal()} aria-label="Close dialog">
          <IoCloseSharp />
        </CloseButton>
      </Header>
      <ModalForm onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <ModalField>
          <ModalLabel htmlFor="new-playground-title">Playground name</ModalLabel>
          <ModalTextInput
            id="new-playground-title"
            type="text"
            placeholder="e.g. Two-sum practice"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoComplete="off"
          />
        </ModalField>
        <ModalField>
          <ModalLabel htmlFor="new-playground-language">Language</ModalLabel>
          <Select
            inputId="new-playground-language"
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
            styles={modalSelectStyles}
          />
        </ModalField>
        <FormSubmitButton type="submit" disabled={!canSubmit}>
          Create playground
        </FormSubmitButton>
      </ModalForm>
    </>
  )
}

export default NewPlayground
