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

const NewPlaygroundAndFolder = () => {
  const { closeModal } = useContext(ModalContext)
  const { addPlaygroundAndFolder } = useContext(PlaygroundContext)

  const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
  ]

  const [playgroundName, setPlaygroundName] = useState('')
  const [folderName, setFolderName] = useState('')
  const [language, setLanguage] = useState(languageOptions[0])

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption)
  }

  const folderOk = folderName.trim().length > 0
  const playgroundOk = playgroundName.trim().length > 0
  const canSubmit = folderOk && playgroundOk

  const handleSubmit = () => {
    if (!canSubmit) return
    addPlaygroundAndFolder(folderName.trim(), playgroundName.trim(), language.value)
    closeModal()
  }

  return (
    <>
      <Header>
        <ModalTitleBlock>
          <h2>Create playground</h2>
          <ModalSubtitle>
            Set up a new folder and your first playground at once. You can add more playgrounds to this folder anytime.
          </ModalSubtitle>
        </ModalTitleBlock>
        <CloseButton type="button" onClick={() => closeModal()} aria-label="Close dialog">
          <IoCloseSharp />
        </CloseButton>
      </Header>
      <ModalForm onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <ModalField>
          <ModalLabel htmlFor="combined-folder-name">Folder name</ModalLabel>
          <ModalTextInput
            id="combined-folder-name"
            type="text"
            placeholder="e.g. Algorithms"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            autoComplete="off"
          />
        </ModalField>
        <ModalField>
          <ModalLabel htmlFor="combined-playground-name">Playground name</ModalLabel>
          <ModalTextInput
            id="combined-playground-name"
            type="text"
            placeholder="e.g. Hello world"
            value={playgroundName}
            onChange={(e) => setPlaygroundName(e.target.value)}
            autoComplete="off"
          />
        </ModalField>
        <ModalField>
          <ModalLabel htmlFor="combined-language">Language</ModalLabel>
          <Select
            inputId="combined-language"
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
            styles={modalSelectStyles}
          />
        </ModalField>
        <FormSubmitButton type="submit" disabled={!canSubmit}>
          Create folder & playground
        </FormSubmitButton>
      </ModalForm>
    </>
  )
}

export default NewPlaygroundAndFolder
