/**
 * heartbeat.js — the sonic identity of Living Atlantic.
 *
 * Design grammar (→ Ch. 7, DP2.1):
 *   PC1 (circulation intensity) → pulse rate + fullness of the beat.
 *   Strong AMOC: full, regular, almost cardiac. Weak AMOC: thin, slow.
 *
 * Rhythm→intensity of a cyclic process is among the most robust auditory
 * mappings documented in the Sonification Handbook (Hermann, Hunt &
 * Neuhoff 2011), and "the heartbeat of the ocean" is already canonical in
 * AMOC public communication — we amplify an image the audience holds.
 *
 * For Scena V: call setRoughness(0..1) to dirty the timbre with filtered
 * noise proportional to ensemble spread (uncertainty as felt quality, DP2.2).
 */

import * as Tone from 'tone';

export function createHeartbeat() {
  const drum = new Tone.MembraneSynth({
    pitchDecay: 0.06,
    octaves: 5,
    envelope: { attack: 0.001, decay: 0.35, sustain: 0.01, release: 0.6 },
  });

  // Uncertainty layer (silent until Scena V asks for it).
  const noise = new Tone.Noise('brown').start();
  const noiseGain = new Tone.Gain(0);
  const noiseFilter = new Tone.Filter(220, 'lowpass');
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);

  const master = new Tone.Gain(0.85).toDestination();
  drum.connect(master);
  noiseGain.connect(master);

  let loop = null;
  let intensity = 0.5; // normalized PC1 ∈ [0,1]

  async function start() {
    await Tone.start();
    if (loop) return;
    loop = new Tone.Loop((time) => {
      // Two-stroke beat: lub... dub.
      const vel = 0.35 + 0.55 * intensity;
      drum.triggerAttackRelease('C1', '8n', time, vel);
      drum.triggerAttackRelease('G0', '8n', time + 0.18, vel * 0.6);
    }, '1m');
    loop.start(0);
    Tone.Transport.start();
    setIntensity(intensity);
  }

  /** v ∈ [0,1]: 0 = weakest observed AMOC, 1 = strongest. */
  function setIntensity(v) {
    intensity = Math.max(0, Math.min(1, v));
    // 34 bpm (faint) → 72 bpm (fully alive). Ramped, never stepped.
    const bpm = 34 + 38 * intensity;
    Tone.Transport.bpm.rampTo(bpm, 0.6);
  }

  /** r ∈ [0,1]: timbral roughness for ensemble uncertainty (Scena V). */
  function setRoughness(r) {
    noiseGain.gain.rampTo(0.25 * Math.max(0, Math.min(1, r)), 0.8);
  }

  function setMuted(m) {
    master.gain.rampTo(m ? 0 : 0.85, 0.4);
  }

  return { start, setIntensity, setRoughness, setMuted };
}
