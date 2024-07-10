import { useEffect, useRef, useState } from 'react'
import Video360 from './Video360'
// import ControlBar from './ControlBar'
import FileToolbar from './FileToolbar'
import ReactDOM from 'react-dom'

export interface MediaFile {
  name: string
  src: string
}

const Player = () => {
  const [currentFile, setCurrentFile] = useState<MediaFile>({ name: 'test.mp4', src: './test.mp4' })

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const video = videoRef.current

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (video) {
      console.log('play', currentFile)
      video.src = currentFile.src
      video.oncanplay = () => currentFile.src !== './test.mp4' && video.play()
    }
  }, [currentFile, video])

  return (
    <div className='w-full h-full relative'>
      {video && isReady && <Video360 video={video} />}
      <video ref={videoRef} className='w-full h-full absolute -z-10 hidden' poster='./poster.webp' crossOrigin='anonymous' />
      <View360ControlsFloatLeft>
        <FileToolbar setCurrentFile={setCurrentFile} />
      </View360ControlsFloatLeft>
      {/* {video && isReady && <ControlBar video={video} currentFile={currentFile} />} */}
    </div>
  )
}

const View360ControlsFloatLeft = ({ children }: { children: JSX.Element }) => {
  const [view360ControlsFloatLeft, setView360ControlsFloatLeft] = useState<Element | null>(null)

  useEffect(() => {
    const observer = new MutationObserver((_mutationsList, observer) => {
      const element = document.querySelector('.view360-controls-float-left')
      if (element) {
        setView360ControlsFloatLeft(element)
        observer.disconnect()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return view360ControlsFloatLeft ? ReactDOM.createPortal(children, view360ControlsFloatLeft) : null
}

export default Player