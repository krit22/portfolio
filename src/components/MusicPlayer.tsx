'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  ChevronDown,
  ListMusic,
  Repeat,
  Sparkles,
  Pin,
  X
} from 'lucide-react'

export interface Track {
  id: string
  title: string
  artist: string
  genre: string
  src: string
  coverColor: string
}

export const TRACKS: Track[] = [
  {
    id: 'midnight-coding',
    title: 'Midnight Coding',
    artist: 'Krit Audio • Ambient',
    genre: 'Lo-Fi Chill',
    src: '/audio/midnight-coding.wav',
    coverColor: 'from-purple-600 via-indigo-600 to-blue-600',
  },
  {
    id: 'cyberpunk-chill',
    title: 'Cyberpunk Chill',
    artist: 'Krit Audio • Synthwave',
    genre: 'Synthwave',
    src: '/audio/cyberpunk-chill.wav',
    coverColor: 'from-pink-600 via-purple-600 to-cyan-600',
  },
  {
    id: 'solar-drift',
    title: 'Solar Drift',
    artist: 'Krit Audio • Deep Focus',
    genre: 'Ambient Space',
    src: '/audio/solar-drift.wav',
    coverColor: 'from-amber-500 via-orange-600 to-rose-600',
  },
]

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isLooping, setIsLooping] = useState(true)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentTrack = TRACKS[currentTrackIndex]

  // Setup Web Audio API Analyser for Visualizer
  const setupAudioContext = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64

      const source = ctx.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(ctx.destination)

      audioContextRef.current = ctx
      analyserRef.current = analyser
      sourceRef.current = source
    } catch {
      // Browsers or CORS fallback
    }
  }, [])

  // Autoplay on Mount with Graceful Browser Policy Fallback
  useEffect(() => {
    const startAutoplay = async () => {
      if (!audioRef.current) return

      try {
        if (!audioContextRef.current) {
          setupAudioContext()
        }
        if (
          audioContextRef.current &&
          audioContextRef.current.state === 'suspended'
        ) {
          await audioContextRef.current.resume()
        }
        await audioRef.current.play()
        setIsPlaying(true)
      } catch {
        // If browser blocks unprompted autoplay, start audio on first user click/touch/scroll anywhere on the page
        const handleFirstInteraction = async () => {
          if (!audioRef.current) return
          try {
            if (!audioContextRef.current) {
              setupAudioContext()
            }
            if (
              audioContextRef.current &&
              audioContextRef.current.state === 'suspended'
            ) {
              await audioContextRef.current.resume()
            }
            await audioRef.current.play()
            setIsPlaying(true)
          } catch {
            // Ignore unhandled errors
          }
          window.removeEventListener('pointerdown', handleFirstInteraction)
          window.removeEventListener('keydown', handleFirstInteraction)
          window.removeEventListener('scroll', handleFirstInteraction)
        }

        window.addEventListener('pointerdown', handleFirstInteraction, {
          once: true,
        })
        window.addEventListener('keydown', handleFirstInteraction, {
          once: true,
        })
        window.addEventListener('scroll', handleFirstInteraction, {
          once: true,
        })
      }
    }

    startAutoplay()
  }, [setupAudioContext])

  // Canvas audio visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyserRef.current.getByteFrequencyData(dataArray)

        const barWidth = (canvas.width / bufferLength) * 1.5
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height

          const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)')
          gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.7)')
          gradient.addColorStop(1, 'rgba(56, 189, 248, 1)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.roundRect(
            x,
            canvas.height - barHeight,
            barWidth - 2,
            barHeight,
            [2, 2, 0, 0]
          )
          ctx.fill()

          x += barWidth + 1
        }
      } else if (isPlaying) {
        const numBars = 20
        const barWidth = canvas.width / numBars - 2
        const now = Date.now() * 0.005

        for (let i = 0; i < numBars; i++) {
          const heightFactor = ((Math.sin(now + i * 0.4) + 1) / 2) * 0.7 + 0.3
          const barHeight = heightFactor * canvas.height * 0.75
          const x = i * (barWidth + 2)

          const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
          gradient.addColorStop(0, 'rgba(147, 51, 234, 0.3)')
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.9)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.roundRect(
            x,
            canvas.height - barHeight,
            barWidth,
            barHeight,
            [2, 2, 0, 0]
          )
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animId) cancelAnimationFrame(animId)
    }
  }, [isPlaying])

  // Play / Pause toggle
  const togglePlay = async () => {
    if (!audioRef.current) return

    if (!audioContextRef.current) {
      setupAudioContext()
    }

    if (
      audioContextRef.current &&
      audioContextRef.current.state === 'suspended'
    ) {
      await audioContextRef.current.resume()
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (err) {
        console.error('Audio playback error:', err)
      }
    }
  }

  // Next Track
  const playNextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % TRACKS.length)
  }, [])

  // Previous Track
  const playPrevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + TRACKS.length) % TRACKS.length
    )
  }

  // Load new track when index changes
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = currentTrack.src
    audioRef.current.load()
    setCurrentTime(0)

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [currentTrackIndex])

  // Sync volume & mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Audio Event Handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    } else {
      playNextTrack()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00'
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // Hover Handlers with Delay Grace Period
  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setIsExpanded(true)
  }

  const handleMouseLeave = () => {
    if (isPinned) return
    leaveTimerRef.current = setTimeout(() => {
      setIsExpanded(false)
    }, 400)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans pointer-events-none">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="relative flex items-end justify-end pointer-events-none">
        {/* Expanded Music Player Card transitioning out of Siri Orb */}
        <div
          className={`origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isExpanded
              ? 'scale-100 opacity-100 pointer-events-auto translate-y-0'
              : 'scale-0 opacity-0 pointer-events-none translate-y-6'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-[340px] sm:w-[380px] bg-neutral-950/90 dark:bg-black/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl text-white">
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                {/* Mini Siri Orb Icon in Header */}
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 animate-jelly-morph-reverse flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
                <span className="text-xs font-pixel uppercase tracking-wider text-neutral-300">
                  Siri Ambient Player
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Pin Player Toggle */}
                <button
                  onClick={() => setIsPinned(!isPinned)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isPinned
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={isPinned ? 'Unpin Player' : 'Pin Player Open'}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>
                {/* Playlist Toggle */}
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    showPlaylist
                      ? 'bg-white/20 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                  title="Playlist"
                >
                  <ListMusic className="w-3.5 h-3.5" />
                </button>
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsPinned(false)
                    setIsExpanded(false)
                  }}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize to Jelly Orb"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Playlist Drawer View */}
            {showPlaylist ? (
              <div className="py-4 space-y-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pb-1">
                  <span>Select Track</span>
                  <span>{TRACKS.length} Tracks</span>
                </div>
                {TRACKS.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setCurrentTrackIndex(idx)
                      setShowPlaylist(false)
                      if (!isPlaying) togglePlay()
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      idx === currentTrackIndex
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/40 text-white'
                        : 'bg-white/5 border-white/5 text-neutral-300 hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${track.coverColor} flex items-center justify-center text-xs font-bold font-mono text-white shadow`}
                      >
                        {idx === currentTrackIndex && isPlaying ? (
                          <Sparkles className="w-4 h-4 animate-spin" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold leading-tight font-pixel">
                          {track.title}
                        </div>
                        <div className="text-xs text-neutral-400 font-mono">
                          {track.genre}
                        </div>
                      </div>
                    </div>
                    {idx === currentTrackIndex && isPlaying && (
                      <span className="text-xs font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 animate-pulse">
                        Playing
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {/* Main Player Display */}
                <div className="my-4 flex items-center gap-4">
                  {/* Album Artwork Display */}
                  <div className="relative group">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentTrack.coverColor} p-1 shadow-lg flex items-center justify-center transition-transform duration-500 ${
                        isPlaying ? 'scale-105 shadow-purple-500/20' : ''
                      }`}
                    >
                      <div
                        className={`w-full h-full rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-white/10 flex items-center justify-center relative overflow-hidden ${
                          isPlaying ? 'animate-pulse' : ''
                        }`}
                      >
                        <div
                          className={`w-14 h-14 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center transition-all ${
                            isPlaying ? 'animate-spin' : ''
                          }`}
                          style={{ animationDuration: '6s' }}
                        >
                          <div className="w-4 h-4 rounded-full bg-white/80 border-2 border-black" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Track Details */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 mb-1">
                      {currentTrack.genre}
                    </span>
                    <h3 className="text-base font-bold font-pixel text-white truncate leading-snug">
                      {currentTrack.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono truncate">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>

                {/* Audio Frequency Spectrum Canvas */}
                <div className="w-full h-10 bg-black/40 rounded-xl overflow-hidden mb-3 border border-white/5 relative">
                  <canvas
                    ref={canvasRef}
                    width={340}
                    height={40}
                    className="w-full h-full block"
                  />
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                  />
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isLooping
                        ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={isLooping ? 'Repeat: On' : 'Repeat: Off'}
                  >
                    <Repeat className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={playPrevTrack}
                      className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Previous"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <button
                      onClick={playNextTrack}
                      className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Next"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 group relative">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <div className="hidden group-hover:flex absolute bottom-full right-0 mb-2 p-2 bg-neutral-900 border border-white/15 rounded-xl shadow-xl items-center gap-2 z-10 animate-in fade-in">
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value))
                          if (isMuted) setIsMuted(false)
                        }}
                        className="w-20 h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Minimized Jelly Glass AI Sound Orb */}
        <div
          className={`absolute bottom-0 right-0 transition-all duration-500 ease-out cursor-pointer ${
            isExpanded
              ? 'scale-0 opacity-0 pointer-events-none'
              : 'scale-100 opacity-100 pointer-events-auto'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsExpanded(true)}
        >
          <div className="relative group w-12 h-12 flex items-center justify-center">
            {/* Ambient Radiant Glow Aura */}
            <div
              className={`absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-500 animate-siri-glow transition-all duration-500 ${
                isPlaying
                  ? 'opacity-95 scale-110 blur-md'
                  : 'opacity-70 scale-95 group-hover:opacity-100 group-hover:scale-110 blur-sm'
              }`}
            />

            {/* Jelly Morphing Mesh Layer */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 animate-jelly-morph mix-blend-screen opacity-90 shadow-xl"
              style={{
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
            />

            {/* Inner Jelly Counter-Morphing Layer */}
            <div
              className="absolute inset-1 bg-gradient-to-bl from-pink-500 via-indigo-600 to-cyan-300 animate-jelly-morph-reverse opacity-85 backdrop-blur-md"
              style={{
                borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%',
              }}
            />

            {/* Glassy Specular Highlight Shell */}
            <div className="absolute inset-0.5 rounded-full liquid-glass-border liquid-glass-shine jelly-glass-core backdrop-blur-xl opacity-95 transition-transform duration-500 group-hover:scale-110" />

            {/* Core Sound Icon */}
            <div className="relative z-10 text-white flex items-center justify-center drop-shadow">
              {isPlaying ? (
                <div className="flex items-end justify-center gap-0.5 h-3.5">
                  <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                  <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
                  <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
                </div>
              ) : (
                <Music className="w-4 h-4 animate-pulse text-white drop-shadow" />
              )}
            </div>

            {/* Floating Tooltip Glassy Pill on Hover */}
            <div className="absolute right-full mr-3 px-3 py-1 bg-black/85 backdrop-blur-xl border border-white/20 rounded-full text-[11px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl pointer-events-none transform group-hover:-translate-x-1">
              {isPlaying ? '🎵 Playing • Hover blob' : '✨ Jelly Sound Orb'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
