import usePlayer from '../hooks/usePlayer'
import { MediaFile } from './Player'

const ControlBar = ({ video, currentFile }
  : { video: HTMLVideoElement, currentFile: MediaFile }) => {

  const {
    isPlaying,
    currentTime,
    duration,
    handlePlay,
    handlePause,
  } = usePlayer(video)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value)
    if (video) {
      video.currentTime = time
    }
  }

  return (
    <div
      className='fixed w-full h-fit bottom-0 left-0 bg-white bg-opacity-50 rounded-t p-2 pt-0 gap-2 flex flex-col z-20'
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
         <span className='text-nowrap text-ellipsis overflow-hidden'>{currentFile.name}</span>
        <button title='播放' onClick={isPlaying ? handlePause : handlePlay}>{isPlaying ? '暂停' : '播放'}</button>
      </div>
    </div>
  )
}

export default ControlBar