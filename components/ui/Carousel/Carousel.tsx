import { FC, useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import { useRecursiveTimeout } from '@lib/hooks'
import { useEmblaCarousel } from 'embla-carousel'

import Image from 'next/image'

interface Props {
  className?: string
  slides: string[]
}

const AUTOPLAY_INTERVAL = 4000;

const Feature: FC<Props> = ({
  className,
  slides
}) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const autoplay = useCallback(() => {
    if (!embla) return
    if (embla.canScrollNext()) {
      embla.scrollNext()
    } else {
      embla.scrollTo(0)
    }
  }, [embla])

  const { play, pause } = useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL)

  const scrollNext = useCallback(() => {
    if (!embla) return
    embla.scrollNext()
    pause()
  }, [embla, pause])

  const scrollPrev = useCallback(() => {
    if (!embla) return
    embla.scrollPrev()
    pause()
  }, [embla, pause])

  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on("select", onSelect)
    embla.on("pointerDown", pause)
  }, [embla, onSelect, pause])

  useEffect(() => {
    play()
  }, [play])

  return (
    <div className={cn(
      'relative py-20 sm:py-23',
      className
    )}>
      <div className="mx-auto text-center px-4 max-w-md sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
        <div className="embla">
          <div className="embla__viewport" ref={viewportRef}>
            <div className="embla__container">
              {slides.map((index) => (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__inner">
                    <img
                      className="embla__slide__img"
                      src={mediaByIndex(index)}
                      alt="A cool cat."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      </div>
    </div>
  )
}

export default Feature