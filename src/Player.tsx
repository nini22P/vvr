import { useEffect, useMemo, useRef, useState } from 'react'
import View360, { ControlBar, EquirectProjection } from '@egjs/react-view360'
import '@egjs/react-view360/css/view360.min.css'
import usePlayer from './hooks/usePlayer'

interface MediaFile {
  name: string
  src: string
}

const Player = () => {
  const [isReady, setIsReady] = useState(false)
  const [currentFile, setCurrentFile] = useState<MediaFile>({ name: 'test.mp4', src: './test.mp4' })

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const video = videoRef.current

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
    <div className='w-full h-full overflow-hidden'>
      {video && isReady && <Video360 video={video} />}
      <video ref={videoRef} className='w-full h-full absolute -z-10 hidden' />
      {video && isReady && <PlayerControlBar video={video} currentFile={currentFile} setCurrentFile={setCurrentFile} />}
    </div>
  )
}

const Video360 = ({ video }: { video: HTMLVideoElement }) => {
  const projection = useMemo(() => new EquirectProjection({ src: video, video: { autoplay: false } }), [video])
  return (
    <View360
      projection={projection}
      onProjectionChange={() => { console.log('projection change') }}
      plugins={[
        new ControlBar({
          autoHide: false,
          showBackground: false,
          progressBar: false,
          playButton: false,
          volumeButton: false,
          fullscreenButton: false,
          videoTime: false,
          pieView: { order: 0 },
          gyroButton: { position: 'top-right', order: 1 },
          vrButton: { position: 'top-right', order: 2 }
        })
      ]}
      className='w-full h-full'
    />
  )
}

const PlayerControlBar = ({ video, currentFile, setCurrentFile }
  : { video: HTMLVideoElement, currentFile: MediaFile, setCurrentFile: (currentFile: MediaFile) => void }) => {

  const {
    isPlaying,
    currentTime,
    duration,
    handlePlay,
    handlePause,
  } = usePlayer(video)

  const handleFileChange = (event: { target: { files: FileList | null } }) => {
    const files = event.target.files
    if (files) {
      const file = files[0]
      if (file) {
        const videoURL = URL.createObjectURL(file)
        setCurrentFile({ name: file.name, src: videoURL })
      }
    }
  }

  const selectFileRef = useRef<HTMLInputElement | null>(null)

  const handleClickSelectFile = () => selectFileRef.current?.click()

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value)
    if (video) {
      video.currentTime = time
    }
  }

  return (
    <div
      className='fixed w-full h-fit bottom-0 left-0 bg-white bg-opacity-50 rounded-t p-2 pt-0 gap-2 flex flex-col z-10'
    >
      <div className='w-full'>
        <input
          type='range'
          min='0'
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          className='w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer range-lg accent-gray-950'
        />
      </div>
      <div className='w-full flex justify-center items-center gap-2'>
        <input
          ref={selectFileRef}
          title='select-file'
          type='file'
          accept='video/*'
          className='hidden'
          onChange={handleFileChange}
        />
        <span className='text-nowrap text-ellipsis overflow-hidden'>{currentFile.name}</span>
        <button title='选择文件' onClick={handleClickSelectFile}>选择文件</button>
        <button title='播放' onClick={isPlaying ? handlePause : handlePlay}>{isPlaying ? '暂停' : '播放'}</button>
      </div>
    </div>
  )
}

export default Player