import { useRef, useState } from 'react'
import { MediaFile } from './Player'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { MdVideoLibrary } from 'react-icons/md'
// import { FaHardDrive } from 'react-icons/fa6'
import { MdLink } from 'react-icons/md'

const FileToolbar = ({ setCurrentFile }: { setCurrentFile: (currentFile: MediaFile) => void }) => {

  const selectFileRef = useRef<HTMLInputElement | null>(null)

  const handleClickSelectFile = () => selectFileRef.current?.click()

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

  const { isOpen: isLinkOpen, onOpen: onLinkOpen, onOpenChange: onLinkOpenChange } = useDisclosure()
  const [link, setLink] = useState('')

  return (
    <>
      <div className='absolute top-0 left-0 z-20 p-2 flex flex-col'>
        <Button isIconOnly aria-label='选择文件' onClick={handleClickSelectFile} className='bg-transparent'>
          <MdVideoLibrary className='w-6 h-6' />
        </Button>
        {/* <Button isIconOnly aria-label='驱动器' className='bg-transparent'>
          <FaHardDrive className='w-5 h-5' />
        </Button> */}
        <Button isIconOnly aria-label='输入链接' onClick={onLinkOpen} className='bg-transparent'>
          <MdLink className='w-6 h-6' />
        </Button>
      </div>

      {/* 文件上传 */}
      <input
        ref={selectFileRef}
        title='select-file'
        type='file'
        accept='video/*'
        className='hidden'
        onChange={handleFileChange}
      />

      {/* 输入链接 */}
      <Modal isOpen={isLinkOpen} onOpenChange={onLinkOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">输入链接</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="视频链接"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light"
                  onPress={() => {
                    onClose()
                    setLink('')
                  }}
                >
                  关闭
                </Button>
                <Button color="primary"
                  onPress={() => {
                    if (link.length === 0) return
                    setCurrentFile({ name: link, src: link })
                    onClose()
                    setLink('')
                  }}
                >
                  播放
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default FileToolbar