import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
    ssr: false
})

export const VideoWrapper = (props) => {
    return <VideoPlayer {...props} />
}

export default VideoWrapper
