"use client"

import { useRef } from 'react'
import ReactPlayer from 'react-player'

export function VideoPlayer({
    url,
    playing = false,
    controls = true,
    light = false,
    volume = 0.8,
    muted = false,
    onReady,
    onStart,
    onPlay,
    onPause,
    onEnded,
    onError,
    config= {
      youtube: {
         playerVars: { showinfo: 1 }
      }
    },
}) {
    const playerRef = useRef(null)

    return (
        <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            controls={controls}
            light={light}
            volume={volume}
            muted={muted}
            playbackRate={1.0}
            width="100%"
            height="100%"
            config={config}
            onReady={onReady}
            onStart={onStart}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            onError={onError}
        />
    )
};

export default VideoPlayer;
