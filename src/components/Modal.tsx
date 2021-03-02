import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import { MdClose } from 'react-icons/md'
import type { ChangeEvent, RefObject } from 'react'

interface ModalProps {
  showModal: boolean,
  setShowModal: (showModal: boolean) => void,
}

function Modal({ showModal, setShowModal }: ModalProps) {
  const modalRef: RefObject<HTMLDivElement> = useRef()

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  })

  const closeModal = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    if (modalRef.current === e.target) {
      setShowModal(false)
    }
  }

  const keyPress = useCallback((e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    if (e.key === 'Escape' && showModal) {
      setShowModal(false)
    }
  }, [setShowModal, showModal])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <>
      {showModal ? (
        <div className="Background w-full h-full bg-black bg-opacity-75 fixed flex justify-center items-center" ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <div className="ModalWrapper shadow-md bg-white grid relative z-10 rounded-xl">
              <div className="ModalContent flex flex-col justify-center items-center leading-relaxed text-gray-900">
                <h2 className="text-4xl text-bold">How to play</h2>
                <p className="my-10 px-48 text-center">Welcome! <br/> this is a little react project made with typescript and tailwindcss, there is a form with 4 fields to choose the questions and a search bar to find any question card that has already loaded, if you try to search for a question in the api this search <b>will not work</b> :(, for now :)</p>
                <button onClick={() => setShowModal(prev => !prev)} className="px-8 py-4 rounded-lg bg-gray-900 text-white border-none">Lets Play!</button>
              </div>
              <MdClose className="absolute right-10 top-10 cursor-pointer" aria-label="Close Modal" onClick={() => setShowModal(prev => !prev)} />
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  )
}

export default Modal