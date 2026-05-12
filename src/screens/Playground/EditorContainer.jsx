import React, { useContext, useState } from 'react'
import CodeEditor from './CodeEditor'
import styled from 'styled-components'
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
import { ModalContext } from '../../context/ModalContext'
import Select from 'react-select';
import { languageMap } from '../../context/PlaygroundContext'

const LANGUAGE_FILE_EXT = {
  cpp: 'cpp',
  java: 'java',
  javascript: 'js',
  python: 'py',
}

function getCodeExportFilename(title, languageKey) {
  const ext = LANGUAGE_FILE_EXT[languageKey] ?? 'txt'
  const raw = (title || '').trim() || 'playground'
  const safe =
    raw
      .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^[-.]+|[-.]+$/g, '')
      .slice(0, 120) || 'playground'
  return `${safe}.${ext}`
}

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    borderRadius: 10,
    borderColor: state.isFocused ? '#0891b2' : '#e2e8f0',
    boxShadow: state.isFocused ? '0 0 0 1px #0891b2' : 'none',
    '&:hover': { borderColor: '#cbd5e1' },
    fontSize: '0.95rem',
    cursor: 'pointer',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '4px 10px',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    minHeight: 44,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0 10px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(15, 23, 42, 0.12)',
    minWidth: '100%',
  }),
  menuList: (base) => ({
    ...base,
    padding: '6px',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '0.95rem',
    padding: '10px 12px',
    minHeight: 42,
    lineHeight: 1.35,
    backgroundColor: state.isSelected ? '#0891b2' : state.isFocused ? '#f1f5f9' : 'white',
    color: state.isSelected ? 'white' : '#0f172a',
    cursor: 'pointer',
  }),
}

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
  background: var(--color-bg);
  border-right: 1px solid var(--color-border);
`

const UpperToolBar = styled.div`
  background: var(--color-surface);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);

  @media (max-width: 540px){
    min-height: 8rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  @media (max-width: 540px){
    width: 100%;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
  min-width: 0;
  flex: 1;
  font-size: 1.15rem;
  color: var(--color-text);

  h3 {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: min(42vw, 280px);
    min-width: 0;
  }

  @media (min-width: 540px){
    margin-right: 1rem;
  }
`

const EditTitleButton = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
  color: var(--color-text);
  transition: background 0.15s ease, color 0.15s ease;

  svg {
    width: 1.35rem;
    height: 1.35rem;
    display: block;
    flex-shrink: 0;
    color: inherit;
  }

  &:hover {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }
`

const SelectBars = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: 100%;

  @media (min-width: 541px) {
    width: auto;
    flex: 1;
    justify-content: flex-end;
    min-width: 0;
  }

  /* react-select wraps each control in a div */
  & > div:first-of-type {
    flex: 1 1 12rem;
    min-width: min(100%, 12rem);
    max-width: 16rem;
  }

  & > div:last-of-type {
    flex: 1 1 15rem;
    min-width: min(100%, 14rem);
    max-width: 20rem;
  }
`

const Button = styled.button`
  padding: 0.55rem 1rem;
  min-width: 6rem;
  background: linear-gradient(135deg, #0891b2, #06b6d4);
  color: #f8fafc;
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`

const CodeEditorContainer = styled.div`
    flex: 1;
    min-height: 240px;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);

    & > div{
        height: 100%;
        min-height: 240px;
    }
`

const LowerToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);

  input{
    display: none;
  }

  label, a {
    font-size: 0.95rem;
    font-weight: 500;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--color-text);
    padding: 0.45rem 0.65rem;
    border-radius: var(--radius-sm);
    transition: background 0.15s ease;
    cursor: pointer;
  }

  label:hover, a:hover {
    background: #f1f5f9;
  }

  button:first-child{
    background: transparent;
    font-size: 0.95rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--color-text);
    padding: 0.45rem 0.65rem;
    border-radius: var(--radius-sm);
    transition: background 0.15s ease;
  }

  button:first-child:hover {
    background: #f1f5f9;
  }

  button:last-child{
    font-weight: 700;
    font-size: 0.95rem;
  }
`
const SaveAndRunButton = styled.button`
  padding: 0.55rem 1.15rem;
  background: linear-gradient(135deg, #0891b2, #06b6d4);
  color: #f8fafc;
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`
const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) => {

  const { openModal } = useContext(ModalContext)
  const themeOptions = [
    { value: 'githubDark', label: 'githubDark' },
    { value: 'githubLight', label: 'githubLight' },
    { value: 'bespin', label: 'bespin' },
    { value: 'duotoneDark', label: 'duotoneDark' },
    { value: 'duotoneLight', label: 'duotoneLight' },
    { value: 'dracula', label: 'dracula' },
    { value: 'xcodeDark', label: 'xcodeDark' },
    { value: 'xcodeLight', label: 'xcodeLight' },
    { value: 'vscodeDark', label: 'vscodeDark' },
    { value: 'vscodeLight', label: 'vscodeLight' },
    { value: 'okaidia', label: 'okaidia' },
  ]

  const languageOptions = [
    { value: 'cpp', label: 'cpp' },
    { value: 'javascript', label: 'javascript' },
    { value: 'java', label: 'java' },
    { value: 'python', label: 'python' },
  ]

  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption)
  }

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption)
    setCurrentLanguage(selectedOption.value)
    setCurrentCode(languageMap[selectedOption.value].defaultCode)
  }

  const [currentTheme, setCurrentTheme] = useState({ value: 'githubDark', label: 'githubDark' })
  const [language, setLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currentLanguage) {
        return languageOptions[i]
      }
    }
    return languageOptions[0];
  })

  return (
    <StyledEditorContainer isFullScreen={isFullScreen}>
     {!isFullScreen && <UpperToolBar>
        <Header>
          <Title>
            <h3>{title}</h3>
            <EditTitleButton
              type="button"
              aria-label="Rename playground"
              title="Rename playground"
              onClick={() => openModal({
              show: true,
              modalType: 5,
              identifiers: {
                folderId: folderId,
                cardId: playgroundId,
              }
            })}
            >
              <BiEditAlt aria-hidden />
            </EditTitleButton>
          </Title>
          <Button onClick={saveCode}>Save code</Button>
        </Header>
        <SelectBars>
          <Select
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
            styles={selectStyles}
          />
          <Select
            options={themeOptions}
            value={currentTheme}
            onChange={handleThemeChange}
            styles={selectStyles}
          />
        </SelectBars>
      </UpperToolBar>
      }
      <CodeEditorContainer>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </CodeEditorContainer>
      <LowerToolBar>
        <button onClick={() => setIsFullScreen((isFullScreen) => !isFullScreen)}>
          <BiFullscreen /> {isFullScreen ? 'Minimize Screen' : 'Full Screen'}
        </button>

        <label htmlFor="codefile">
          <input type="file" accept="." id="codefile" onChange={(e) => getFile(e, setCurrentCode)} /> <BiImport /> Import Code
        </label>

        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`}
          download={getCodeExportFilename(title, currentLanguage)}
        >
          <BiExport /> Export Code
        </a>
        <SaveAndRunButton onClick={runCode}>Run Code</SaveAndRunButton>
      </LowerToolBar>
    </StyledEditorContainer >
  )
}

export default EditorContainer