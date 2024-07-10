import View360, { EquirectProjection, ControlBar } from '@egjs/react-view360'
import { useMemo } from 'react'
import '@egjs/react-view360/css/view360.min.css'

const Video360 = ({ video }: { video: HTMLVideoElement | string }) => {
  const projection = useMemo(() => new EquirectProjection({ src: video, video: { autoplay: false } }), [video])
  return (
    <View360
      projection={projection}
      onProjectionChange={() => { console.log('projection change') }}
      plugins={[
        new ControlBar({
          // autoHide: false,
          // showBackground: false,
          // progressBar: false,
          // playButton: false,
          // volumeButton: false,
          // fullscreenButton: false,
          // videoTime: false,
          pieView: { order: 0 },
          gyroButton: { position: 'top-right', order: 1 },
          vrButton: { position: 'top-right', order: 2 }
        })
      ]}
      className='w-full h-full'
    />
  )
}

export default Video360