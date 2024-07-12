import { useEffect, useState } from 'react'
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

  return (
    <div className='w-full h-full relative'>
      <Video360 video={currentFile.src} />
      <View360ControlsFloatLeft>
        <FileToolbar setCurrentFile={setCurrentFile} />
      </View360ControlsFloatLeft>
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