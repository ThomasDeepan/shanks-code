import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Code2,
} from 'lucide-react';
import { DetailedLesson } from '../types';

export interface VideoPlayerAreaProps {
  lesson: DetailedLesson;
}

const formatTimecode = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const VideoPlayerArea: React.FC<VideoPlayerAreaProps> = ({ lesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [progressPercent, setProgressPercent] = useState<number>(28);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const durationSeconds = lesson.videoDurationSeconds || 1200;
  const currentSeconds = Math.round((progressPercent / 100) * durationSeconds);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section aria-label={`Lecture video player for ${lesson.title}`}>
      {/* Video Player Frame (16:9 Aspect Ratio) */}
      <div
        className="w-full aspect-video bg-slate-950 rounded-lg overflow-hidden shadow-2xs border border-slate-800/90 flex flex-col justify-between relative group select-none"
        role="region"
        aria-label={`Instructional video player for ${lesson.title}`}
      >
        {/* Top Subtle Overlay Header */}
        <div className="p-2 sm:p-2.5 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/30 to-transparent z-10">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="w-5 h-5 rounded bg-[#1B2A4A] text-white flex items-center justify-center shrink-0 border border-white/20">
              <Code2 className="w-3 h-3 text-white" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold text-slate-200 tracking-tight truncate">
              {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 bg-black/50 border border-white/10 px-1.5 py-0.5 rounded">
              Lesson Preview
            </span>
          </div>
        </div>

        {/* Center Screen: Interactive Play/Pause & Code Canvas Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Subtle Educational Code Canvas Pattern */}
          <div className="absolute inset-0 opacity-12 pointer-events-none flex flex-col justify-center px-6 font-mono text-[10px] text-slate-500 leading-relaxed overflow-hidden">
            <p className="truncate">// Shank's Code: {lesson.title}</p>
            <p className="truncate">export const executeModule = async (runtime: RuntimeEngine) =&gt; &#123;</p>
            <p className="truncate">&nbsp;&nbsp;await runtime.initializePipeline(&#123; strict: true &#125;);</p>
            <p className="truncate">&nbsp;&nbsp;return runtime.compileContracts();</p>
            <p className="truncate">&#125;;</p>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video lecture' : 'Play video lecture'}
            className="relative z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#1B2A4A] hover:bg-[#2F4368] text-white flex items-center justify-center shadow-md transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/80 border border-white/20"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Bottom Video Controls Bar */}
        <div className="p-2 sm:p-2.5 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1.5 z-10">
          {/* Scrubber Bar with Accessible Slider Semantics */}
          <div>
            <div
              role="slider"
              tabIndex={0}
              aria-label="Video seek scrubber"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              aria-valuetext={`${progressPercent} percent completed, current time ${formatTimecode(currentSeconds)}`}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                setProgressPercent(Math.round(pos * 100));
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  setProgressPercent((prev) => Math.min(100, prev + 5));
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  setProgressPercent((prev) => Math.max(0, prev - 5));
                } else if (e.key === 'Home') {
                  e.preventDefault();
                  setProgressPercent(0);
                } else if (e.key === 'End') {
                  e.preventDefault();
                  setProgressPercent(100);
                }
              }}
              className="w-full h-1.5 hover:h-2 bg-slate-800 rounded-full cursor-pointer relative transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <div
                className="bg-[#D9A62B] h-full rounded-full transition-all relative flex items-center justify-end"
                style={{ width: `${progressPercent}%` }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-2xs -mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Controls Actions Row */}
          <div className="flex items-center justify-between text-white text-xs gap-2">
            {/* Left Controls: Play, Restart, Audio, Timestamp */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                ) : (
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setProgressPercent(0)}
                aria-label="Restart video from beginning"
                className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#B4552C]" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>

              <span className="font-mono text-[10px] sm:text-xs text-slate-300 font-medium pl-1">
                {formatTimecode(currentSeconds)} / {formatTimecode(durationSeconds)}
              </span>
            </div>

            {/* Right Controls: Playback Speed & Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={cycleSpeed}
                aria-label={`Current playback speed is ${playbackSpeed}x. Click to change speed.`}
                className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {playbackSpeed.toFixed(2).replace(/\.00$/, '')}x
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {isFullscreen ? (
                  <Minimize className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Maximize className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayerArea;
