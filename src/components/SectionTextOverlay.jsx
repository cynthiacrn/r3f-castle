import { cameraSteps } from '../utils/cameraSteps'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function SectionTextOverlay({ index }) {
  const [exitingIndex, setExitingIndex] = useState(null)

  const currTitleRef = useRef(null)
  const currTextRef = useRef(null)
  const exitTitleRef = useRef(null)
  const exitTextRef = useRef(null)

  const prevIndex = useRef(index)

  useEffect(() => {
    const screenWidth = window.innerWidth

    // Si l'index change, déclencher la sortie de l'ancien texte
    if (prevIndex.current !== index) {
      const lastIndex = prevIndex.current
      setExitingIndex(lastIndex)

      requestAnimationFrame(() => {
        if (exitTitleRef.current && exitTextRef.current) {
          gsap.to(exitTitleRef.current, {
            opacity: 0,
            x: -screenWidth * 0.7,
            duration: 2,
            ease: 'expo.inOut',
          })
          gsap.to(exitTextRef.current, {
            opacity: 0,
            x: -screenWidth,
            duration: 2,
            delay: 0.1, // effet cascade
            ease: 'expo.inOut',
            onComplete: () => setExitingIndex(null),
          })
        }
      })
    }

    // Animation d’entrée du texte
    if (currTitleRef.current && currTextRef.current) {
      gsap.fromTo(
        currTitleRef.current,
        { opacity: 0, x: screenWidth * 0.7 },
        {
          opacity: 1,
          x: 0,
          duration: 2,
          ease: 'expo.inOut',
        }
      )
      gsap.fromTo(
        currTextRef.current,
        { opacity: 0, x: screenWidth },
        {
          opacity: 1,
          x: 0,
          duration: 2,
          delay: 0.1,
          ease: 'expo.inOut',
        }
      )
    }

    prevIndex.current = index
  }, [index])

  const { title, text } = cameraSteps[index]
  const exiting = exitingIndex !== null ? cameraSteps[exitingIndex] : null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        flexDirection: 'column',
        userSelect: 'none',
      }}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Texte sortant */}
        {exiting && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: '100px',
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '20px',
              pointerEvents: 'none',
            }}
          >
            <h1
              ref={exitTitleRef}
              className="font-gill"
              style={{
                fontSize: 'min(70px, 8.4vh)',
                textTransform: 'uppercase',
                color: '#F5F5F5',
                margin: 0,
              }}
            >
              {exiting.title}
            </h1>
            <p
              ref={exitTextRef}
              className="font-ebgaramond"
              style={{
                width: '80%',
                fontSize: 'min(16px, 2.2vh)',
                color: '#F5F5F5',
                margin: 0,
              }}
            >
              {exiting.text}
            </p>
          </div>
        )}

        {/* Texte entrant */}
        <div
          style={{
            padding: '100px',
            width: '50%',
            minHeight: '30vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            gap: '20px',
            pointerEvents: 'none',
          }}
        >
          <h1
            ref={currTitleRef}
            className="font-gill"
            style={{
              fontSize: 'min(70px, 8.4vh)',
              textTransform: 'uppercase',
              color: '#F5F5F5',
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            ref={currTextRef}
            className="font-ebgaramond"
            style={{
              width: '80%',
              fontSize: 'min(16px, 2.2vh)',
              color: '#F5F5F5',
              margin: 0,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
