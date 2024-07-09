import { useEffect, useState } from "react"

const usePlayer = (player: HTMLVideoElement | null) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(
    () => {
      if (player) {
        player.ontimeupdate = () => setCurrentTime(Number(player.currentTime.toFixed(0)))
        player.onloadedmetadata = () => setDuration(Number(player.duration.toFixed(0)))
        player.onplay = () => { setIsPlaying(true), console.log('播放') }
        player.onpause = () => setIsPlaying(false)
        player.onended = () => setIsPlaying(false)
      }
    },
    [player]
  )

  const handlePlay = () => {
    player?.play()
  };

  const handlePause = () => {
    player?.pause();
  };

  return {
    isPlaying,
    currentTime,
    duration,
    handlePlay,
    handlePause,
  }
}

export default usePlayer