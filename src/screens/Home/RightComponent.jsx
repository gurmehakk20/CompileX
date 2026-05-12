import React, { useContext } from 'react'
import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logo.png'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { useNavigate } from 'react-router-dom'

const StyledRightComponent = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    padding: 2rem 2.25rem 3rem;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
        padding: 1.25rem 1rem 2rem;
    }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: space-between;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.25rem;
`

const Heading = styled.h3`
  font-size: ${props => props.size === 'small' ? "1.15rem" : "1.65rem"};
  font-weight: 400;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span{
    font-weight: 700;
    color: var(--color-accent);
  }
`

const AddButton = styled.button`
    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    border-radius: var(--radius-pill);
    color: var(--color-text);
    padding: 0.45rem 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    box-shadow: var(--shadow-sm);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    span{
        font-size: 1.35rem;
        font-weight: 700;
        line-height: 1;
        color: var(--color-accent);
    }

    &:hover{
        cursor: pointer;
        border-color: var(--color-accent);
        box-shadow: var(--shadow-md);
    }
`

const FolderCard = styled.section`
    margin-bottom: 1.75rem;
    padding: 1rem 1.25rem 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
`

const FolderIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;
    flex-shrink: 0;
    cursor: pointer;
    color: var(--color-text-muted);

    svg {
      flex-shrink: 0;
      box-sizing: content-box;
      padding: 0.35rem;
      font-size: 1.25rem;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: var(--radius-sm);
      transition: background 0.15s ease, color 0.15s ease;
      color: inherit;
    }

    svg:hover {
      background: var(--color-accent-soft);
      color: var(--color-accent);
    }
`

const CardActions = styled(FolderIcons)`
    margin-left: 0.5rem;
    color: var(--color-text);

    svg {
      font-size: 1.3rem;
      width: 1.3rem;
      height: 1.3rem;
    }

    svg:hover {
      color: var(--color-accent);
    }
`

const PlayGroundCards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1.25rem;

    @media (max-width: 428px){
        grid-template-columns: 1fr;
    }    
`

const Card = styled.div`
    padding: 0.85rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-surface-elevated);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

    &:hover{
      transform: translateY(-2px);
      border-color: var(--color-border-strong);
      box-shadow: var(--shadow-md);
    }
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`

const CardContent = styled.div`
  min-width: 0;

  p {
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0.35rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const LangBadge = styled.span`
  display: inline-block;
  margin-top: 0.35rem;
  padding: 0.15rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: var(--color-accent-soft);
  border-radius: 6px;
`

const Logo = styled.img`
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    padding: 8px;
    object-fit: contain;
    margin-right: 0.85rem;
    flex-shrink: 0;
    border-radius: var(--radius-sm);
    background: var(--color-accent-soft);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-sm);

    @media (max-width: 425px){
        width: 48px;
        height: 48px;
        padding: 6px;
        margin-right: 0.65rem;
    }
`
const RightComponent = () => {
  const navigate = useNavigate();

  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);

  return (
    <StyledRightComponent>
      <Header>
        <Heading size="large">
          My <span>Playground</span>
        </Heading>
        <AddButton onClick={() => openModal({
          show: true,
          modalType: 1,
          identifiers: {
            folderId: "",
            cardId: "",
          }
        })}> <span>+</span> New Folder</AddButton>
      </Header>

      {
        Object.entries(folders).map(([folderId, folder]) => (
          <FolderCard key={folderId}>
            <Header>
              <Heading size="small">
                <FcOpenedFolder /> {folder.title}
              </Heading>
              <FolderIcons>
                <IoTrashOutline onClick={() => deleteFolder(folderId)} />
                <BiEditAlt onClick={() => openModal({
                  show: true,
                  modalType: 4,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })} />
                <AddButton onClick={() => openModal({
                  show: true,
                  modalType: 2,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })}><span>+</span> New Playground</AddButton>
              </FolderIcons>
            </Header>

            <PlayGroundCards>
              {
                Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
                  <Card key={playgroundId} onClick={() => {
                    navigate(`/playground/${folderId}/${playgroundId}`)
                  }}>
                    <CardContainer>
                      <Logo src={logo} alt="" />
                      <CardContent>
                        <p>{playground.title ?? playground.name ?? 'Untitled'}</p>
                        <LangBadge title={playground.language}>{playground.language}</LangBadge>
                      </CardContent>
                    </CardContainer>
                    <CardActions onClick={(e) => {
                      e.stopPropagation(); //stop click propagation from child to parent
                    }}>
                      <IoTrashOutline onClick={() => deleteCard(folderId, playgroundId)} />
                      <BiEditAlt onClick={() => openModal({
                        show: true,
                        modalType: 5,
                        identifiers: {
                          folderId: folderId,
                          cardId: playgroundId,
                        }
                      })} />
                    </CardActions>
                  </Card>
                ))
              }
            </PlayGroundCards>
          </FolderCard>
        ))
      }
    </StyledRightComponent>
  )
}

export default RightComponent;