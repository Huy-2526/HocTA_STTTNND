"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Camera, CameraOff, Volume2, RotateCcw, Sparkles, Scan, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllWords, type VocabWord } from "@/lib/vocabulary-data"

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.7
    utterance.pitch = 1.2
    window.speechSynthesis.speak(utterance)
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface FloatingObject {
  id: string
  word: VocabWord
  x: number
  y: number
  scale: number
  rotation: number
  speed: number
  captured: boolean
}

function generateObjects(): FloatingObject[] {
  const words = shuffleArray(getAllWords()).slice(0, 8)
  return words.map((word, i) => ({
    id: `${word.id}-${i}`,
    word,
    x: 10 + Math.random() * 75,
    y: 10 + Math.random() * 70,
    scale: 0.8 + Math.random() * 0.6,
    rotation: -15 + Math.random() * 30,
    speed: 1 + Math.random() * 2,
    captured: false,
  }))
}

function ARCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [objects, setObjects] = useState<FloatingObject[]>([])
  const [selectedObject, setSelectedObject] = useState<FloatingObject | null>(null)
  const [capturedCount, setCapturedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const initObjects = useCallback(() => {
    setObjects(generateObjects())
    setCapturedCount(0)
    setSelectedObject(null)
  }, [])

  useEffect(() => {
    initObjects()
  }, [initObjects])

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setError(null)
      }
    } catch {
      setError("Camera not available. Using the AR simulation mode instead!")
      setCameraActive(false)
    }
  }

  function stopCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  function captureObject(obj: FloatingObject) {
    setSelectedObject(obj)
    speak(`${obj.word.word}! ${obj.word.sentence}`)
    setObjects((prev) =>
      prev.map((o) => (o.id === obj.id ? { ...o, captured: true } : o))
    )
    setCapturedCount((prev) => prev + 1)
  }

  // Animate floating objects
  useEffect(() => {
    const interval = setInterval(() => {
      setObjects((prev) =>
        prev.map((obj) => {
          if (obj.captured) return obj
          return {
            ...obj,
            x: obj.x + Math.sin(Date.now() / 1000 * obj.speed) * 0.3,
            y: obj.y + Math.cos(Date.now() / 800 * obj.speed) * 0.2,
            rotation: obj.rotation + Math.sin(Date.now() / 1200) * 0.5,
          }
        })
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-card rounded-2xl border-2 border-border px-4 py-2">
          <span className="text-sm text-muted-foreground">Captured</span>
          <div className="text-xl font-bold text-primary font-[var(--font-display)]">{capturedCount}/8</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={initObjects}
            className="rounded-full"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={cameraActive ? stopCamera : startCamera}
            className={`rounded-full ${cameraActive ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}
          >
            {cameraActive ? (
              <>
                <CameraOff className="w-4 h-4 mr-1" />
                Stop
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-1" />
                Camera
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AR Viewport */}
      <div className="relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden border-2 border-border bg-foreground/5">
        {/* Camera feed or background */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? "block" : "hidden"}`}
        />

        {!cameraActive && (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#FFE0C2_0%,#FFF9F0_50%,#E0F7F5_100%)]">
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Scanning animation */}
        <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-2xl pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
        </div>

        {/* Floating word objects */}
        {objects.map((obj) => (
          <button
            key={obj.id}
            onClick={() => !obj.captured && captureObject(obj)}
            disabled={obj.captured}
            className={`absolute transition-all duration-200 ${
              obj.captured
                ? "opacity-30 scale-75"
                : "cursor-pointer hover:scale-110 active:scale-95"
            }`}
            style={{
              left: `${Math.max(5, Math.min(85, obj.x))}%`,
              top: `${Math.max(5, Math.min(80, obj.y))}%`,
              transform: `scale(${obj.scale}) rotate(${obj.rotation}deg)`,
            }}
            aria-label={`Capture ${obj.word.word}`}
          >
            <div className={`bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 p-2 md:p-3 ${
              obj.captured ? "border-success/30" : "border-primary/40"
            }`}>
              <div className="text-2xl md:text-4xl text-center">{obj.word.image}</div>
              <div className="text-xs md:text-sm font-bold text-card-foreground text-center font-[var(--font-display)]">
                {obj.word.word}
              </div>
            </div>
          </button>
        ))}

        {/* Scan text */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
          <Scan className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-semibold text-card-foreground">Tap words to capture them!</span>
        </div>

        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-xs font-semibold">
            {error}
          </div>
        )}
      </div>

      {/* Selected word detail */}
      {selectedObject && (
        <div className="mt-6 bg-card rounded-3xl border-2 border-primary/30 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{selectedObject.word.image}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-card-foreground font-[var(--font-display)]">
                {selectedObject.word.word}
              </h3>
              <p className="text-sm text-muted-foreground">{selectedObject.word.phonetic}</p>
              <p className="text-sm text-card-foreground mt-1">{`"${selectedObject.word.sentence}"`}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => speak(`${selectedObject.word.word}. ${selectedObject.word.sentence}`)}
              className="rounded-full"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Captured words */}
      {capturedCount > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-foreground font-[var(--font-display)] mb-3">
            Captured Words ({capturedCount})
          </h3>
          <div className="flex flex-wrap gap-2">
            {objects
              .filter((o) => o.captured)
              .map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => {
                    setSelectedObject(obj)
                    speak(obj.word.word)
                  }}
                  className="flex items-center gap-2 bg-success/10 border border-success/30 rounded-full px-3 py-1.5 cursor-pointer hover:bg-success/20 transition-colors"
                >
                  <span className="text-lg">{obj.word.image}</span>
                  <span className="text-sm font-semibold text-success">{obj.word.word}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ARIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="relative rounded-3xl overflow-hidden mb-8 border-2 border-border shadow-lg">
        <Image
          src="/images/ar-experience.jpg"
          alt="Augmented reality learning experience"
          width={700}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold text-foreground font-[var(--font-display)] mb-4">
        How AR Magic Works
      </h2>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-2xl border-2 border-border p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-bold text-card-foreground text-sm">Open Camera</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Start the AR mode to see words float around you
          </p>
        </div>
        <div className="bg-card rounded-2xl border-2 border-border p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Maximize className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-bold text-card-foreground text-sm">Tap to Capture</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Tap on floating words to catch and learn them
          </p>
        </div>
        <div className="bg-card rounded-2xl border-2 border-border p-4">
          <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-[#B8860B]" />
          </div>
          <h3 className="font-bold text-card-foreground text-sm">Collect All</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Catch all the words and hear them spoken aloud
          </p>
        </div>
      </div>

      <Button
        size="lg"
        onClick={onStart}
        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-bold text-lg"
      >
        <Camera className="w-5 h-5 mr-2" />
        Launch AR Experience
      </Button>
    </div>
  )
}

export function ARExperience() {
  const [started, setStarted] = useState(false)

  if (!started) {
    return <ARIntro onStart={() => setStarted(true)} />
  }

  return <ARCamera />
}
