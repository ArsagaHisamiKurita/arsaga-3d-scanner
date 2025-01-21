"use client"

import { createRef, RefObject, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const Tile = () => {
  const TILES_LENGTH = 20
  const listRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);

  Array.from({length: TILES_LENGTH}, (_, i) => (
    listRefs.current[i] = createRef<HTMLDivElement>()
  ))

  const tileAnimation = (randIndex: number, delay: number) => {
    gsap.to(listRefs.current[randIndex].current, {
      duration: 0.1,
      delay: delay,
      opacity: 0.95,
      onComplete: () => {
        gsap.to(listRefs.current[randIndex].current, {
          duration: 0.1,
          opacity: 1
        })
      }
    })  
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randIndex_01 = Math.floor(Math.random() * TILES_LENGTH)
      const randIndex_02 = Math.floor(Math.random() * TILES_LENGTH)
      tileAnimation(randIndex_01, 0)
      tileAnimation(randIndex_02, 0.05)
    }, 200)

    return () => clearInterval(intervalId)
  }, [])

  return(
    <div className="absolute top-0 left-0 w-full h-full grid grid-cols-5 grid-rows-4">
      {/* <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div>
      <div className="bg-neutral-950"></div> */}
      {/* for文で生成 */}
      {Array.from({length: 20}, (_, i) => (
        <div key={i} ref={listRefs.current[i]} className="bg-neutral-950"></div>
      ))}
    </div>
  )
}