import React, { useContext } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { ModalContext } from '../../context/ModalContext'

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100vh;
    background: linear-gradient(165deg, #0f172a 0%, #1e293b 42%, #0c4a6e 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
        min-height: 52vh;
    }
`
const ContentContainer = styled.div`
    text-align: center;
`

const Logo = styled.img`
    width: clamp(118px, 20vw, 176px);
    height: auto;
    display: block;
    margin: 0 auto 1.25rem;
    filter: drop-shadow(0 6px 18px rgba(34, 211, 238, 0.32))
        drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
    transition: transform 0.4s cubic-bezier(0.34, 1.45, 0.64, 1), filter 0.35s ease;

    &:hover {
        transform: scale(1.045) translateY(-3px);
        filter: drop-shadow(0 12px 32px rgba(34, 211, 238, 0.48))
            drop-shadow(0 4px 14px rgba(0, 0, 0, 0.4));
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
            transform: none;
        }
    }
`

const MainHeading = styled.h1`
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 400;
    color: #f8fafc;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;

    span{
        font-weight: 700;
        background: linear-gradient(90deg, #22d3ee, #38bdf8);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
`
const SubHeading = styled.div`
    font-size: clamp(1.1rem, 2vw, 1.45rem);
    color: rgba(248, 250, 252, 0.82);
    margin-bottom: 1.75rem;
    font-weight: 400;
`

const AddNewButton = styled.button`
    padding: 0.65rem 1.35rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: var(--radius-pill);
    background: linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%);
    color: #f8fafc;
    box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    span{
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
    }

    &:hover{
        cursor: pointer;
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    }

    &:active {
        transform: translateY(0);
    }
`
const LeftComponent = () => {
    const { openModal } = useContext(ModalContext);
    return (
        <StyledLeftComponent>
            <ContentContainer>
                <Logo src={logo} alt="CompileX" />
                <MainHeading> <span>Compile</span>X</MainHeading>
                <SubHeading>Code. Compile. Debug.</SubHeading>
                <AddNewButton onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })} ><span>+</span> Create New Playground</AddNewButton>
            </ContentContainer>
        </StyledLeftComponent>
    )
}

export default LeftComponent