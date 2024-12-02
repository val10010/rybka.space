import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(() => import('./videoPlayer'), {
    ssr: false
})

export const VideoWrapper = (props) => {
    return <VideoPlayer {...props} />
}

export default VideoWrapper
