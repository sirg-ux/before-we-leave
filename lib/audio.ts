"use client";

type SoundName = "boot" | "click" | "insert" | "eject" | "hover";

type AudioContextWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let context: AudioContext | null = null;
let masterGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let musicGain: GainNode | null = null;

let musicTimer: number | null = null;
let musicStep = 0;
let muted = false;

const listeners = new Set<(isMuted: boolean) => void>();

function notify() {
  listeners.forEach((listener) => listener(muted));
}

function getContext() {
  if (typeof window === "undefined") return null;

  if (context) return context;

  const AudioContextClass =
    window.AudioContext ||
    (window as AudioContextWindow).webkitAudioContext;

  if (!AudioContextClass) return null;

  context = new AudioContextClass();

  masterGain = context.createGain();
  sfxGain = context.createGain();
  musicGain = context.createGain();

  masterGain.gain.value = muted ? 0 : 0.82;
  sfxGain.gain.value = 0.26;
  musicGain.gain.value = 0.055;

  sfxGain.connect(masterGain);
  musicGain.connect(masterGain);
  masterGain.connect(context.destination);

  return context;
}

async function unlock() {
  const audioContext = getContext();

  if (!audioContext) return;

  if (audioContext.state !== "running") {
    await audioContext.resume();
  }
}

function playTone({
  frequency,
  duration,
  volume,
  type = "square",
  slideTo,
  destination = "sfx",
}: {
  frequency: number;
  duration: number;
  volume: number;
  type?: OscillatorType;
  slideTo?: number;
  destination?: "sfx" | "music";
}) {
  const audioContext = getContext();

  if (!audioContext || !sfxGain || !musicGain) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  const output = destination === "music" ? musicGain : sfxGain;
  const now = audioContext.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);

  if (slideTo) {
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(slideTo, 1),
      now + duration,
    );
  }

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(output);

  oscillator.start(now);
  oscillator.stop(now + duration + 0.03);
}

function playNoise(duration = 0.035, volume = 0.08) {
  const audioContext = getContext();

  if (!audioContext || !sfxGain) return;

  const length = Math.max(1, Math.floor(audioContext.sampleRate * duration));
  const buffer = audioContext.createBuffer(
    1,
    length,
    audioContext.sampleRate,
  );

  const data = buffer.getChannelData(0);

  for (let index = 0; index < length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / length);
  }

  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();

  filter.type = "highpass";
  filter.frequency.value = 1500;

  gain.gain.value = volume;

  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(sfxGain);

  source.start();
}

function playSfx(name: SoundName) {
  void unlock();

  switch (name) {
    case "click":
      playTone({
        frequency: 720,
        duration: 0.045,
        volume: 0.15,
        type: "square",
        slideTo: 920,
      });
      break;

    case "hover":
      playTone({
        frequency: 540,
        duration: 0.025,
        volume: 0.045,
        type: "sine",
        slideTo: 600,
      });
      break;

    case "insert":
      playTone({
        frequency: 180,
        duration: 0.11,
        volume: 0.13,
        type: "triangle",
        slideTo: 480,
      });

      window.setTimeout(() => {
        playTone({
          frequency: 620,
          duration: 0.08,
          volume: 0.1,
          type: "square",
          slideTo: 760,
        });
      }, 70);

      break;

    case "eject":
      playTone({
        frequency: 560,
        duration: 0.16,
        volume: 0.12,
        type: "sawtooth",
        slideTo: 160,
      });

      window.setTimeout(() => {
        playNoise(0.035, 0.05);
      }, 30);

      break;

    case "boot":
      playTone({
        frequency: 210,
        duration: 0.15,
        volume: 0.12,
        type: "triangle",
        slideTo: 330,
      });

      window.setTimeout(() => {
        playTone({
          frequency: 495,
          duration: 0.11,
          volume: 0.1,
          type: "square",
          slideTo: 680,
        });
      }, 150);

      window.setTimeout(() => {
        playTone({
          frequency: 880,
          duration: 0.16,
          volume: 0.11,
          type: "sine",
        });
      }, 290);

      break;
  }
}

const melody = [
  293.66, 349.23, 440, 523.25,
  440, 349.23, 293.66, 261.63,
  293.66, 392, 440, 587.33,
  523.25, 440, 349.23, 293.66,
];

const bass = [
  73.42, 73.42, 87.31, 87.31,
  65.41, 65.41, 73.42, 73.42,
];

function playMusicStep() {
  const step = musicStep % melody.length;
  const bassStep = Math.floor(musicStep / 2) % bass.length;

  playTone({
    frequency: melody[step],
    duration: 0.24,
    volume: 0.13,
    type: "triangle",
    destination: "music",
  });

  if (musicStep % 2 === 0) {
    playTone({
      frequency: bass[bassStep],
      duration: 0.32,
      volume: 0.17,
      type: "sine",
      destination: "music",
    });
  }

  if (musicStep % 4 === 2) {
    playTone({
      frequency: melody[step] / 2,
      duration: 0.07,
      volume: 0.045,
      type: "square",
      destination: "music",
    });
  }

  musicStep += 1;
}

async function startMusic() {
  await unlock();

  if (musicTimer !== null) return;

  playMusicStep();

  musicTimer = window.setInterval(() => {
    playMusicStep();
  }, 245);
}

function stopMusic() {
  if (musicTimer === null) return;

  window.clearInterval(musicTimer);
  musicTimer = null;
  musicStep = 0;
}

function setMuted(nextMuted: boolean) {
  muted = nextMuted;

  if (masterGain) {
    masterGain.gain.setTargetAtTime(
      muted ? 0 : 0.82,
      masterGain.context.currentTime,
      0.03,
    );
  }

  notify();
}

function toggleMuted() {
  setMuted(!muted);

  if (!muted) {
    void startMusic();
  }

  return muted;
}

function subscribe(listener: (isMuted: boolean) => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export const audioEngine = {
  unlock,
  playSfx,
  startMusic,
  stopMusic,
  setMuted,
  toggleMuted,
  subscribe,
  getMuted: () => muted,
};