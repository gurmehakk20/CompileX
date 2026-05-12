import React, { useContext, useState } from 'react'
import { Header, CloseButton, Input } from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'

const EditPlaygroundTitle = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { editPlaygroundTitle, folders } = useContext(PlaygroundContext);

  const { folderId, cardId } = isOpenModal.identifiers;
  const playground = folders[folderId]?.playgrounds[cardId];
  const initialTitle = playground?.title ?? playground?.name ?? '';
  const [playgroundTitle, setPlaygroundTitle] = useState(initialTitle);

  return (
    <>
      <Header>
        <h2>Edit Card Title</h2>
        <CloseButton onClick={() => closeModal()}>
          <IoCloseSharp />
        </CloseButton>
      </Header>
      <Input>
        <input
          type="text"
          value={playgroundTitle}
          onChange={(e) => setPlaygroundTitle(e.target.value)}
        />
        <button onClick={() => {
          editPlaygroundTitle(folderId, cardId, playgroundTitle)
          closeModal()
        }}>Update Title</button>
      </Input>
    </>
  )
}

export default EditPlaygroundTitle