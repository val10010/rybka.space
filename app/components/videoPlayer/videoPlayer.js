"use client"

import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useTranslations } from 'next-intl'

import styles from './videoPlayer.module.scss'

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
    const [shouldLoad, setShouldLoad] = useState(false)
    const thumbnailUrl = `https://img.youtube.com/vi/${getYouTubeVideoId(url)}/maxresdefault.jpg`
    const t = useTranslations('components.videoPlayer')

    function getYouTubeVideoId(url) {
        const regExp = /^.*(?:(?:youtu\.be\/|youtube\.com\/(?:(?:watch\?v=)|(?:shorts\/)))|(?:embed\/))([^?&"'>]+)/;
        const match = url.match(regExp);
        return match && match[1];
    }

    if (!shouldLoad) {
        return (
            <div className={styles.previewContainer} onClick={() => setShouldLoad(true)}>
                <img src={thumbnailUrl} alt={t('previewAlt')} className={styles.previewImage} />
                <button className={styles.playButton} aria-label={t('playButton')}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        )
    }

    return (
        <ReactPlayer
            ref={playerRef}
            url={url}
            playing={true}
            controls={controls}
            light={light}
            volume={volume}
            muted={false}
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
