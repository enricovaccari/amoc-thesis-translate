# Media — Living Atlantic

Screenshots and (to-be-recorded) videos of the nine scenes. All screenshots are
**3840×2160 (4K)**, captured from the live scenes at a 1920×1080 layout.

```
media/
├── screenshots/
│   ├── titles/           ← title / landing screen of every scene (9)
│   │   ├── scene1-column-static.png
│   │   ├── scene1-column-experiential.png
│   │   ├── scene1-column-tot.png
│   │   ├── scene2-engine-static.png
│   │   ├── scene2-engine-experiential.png
│   │   ├── scene2-engine-tot.png
│   │   ├── scene3-threshold-static.png
│   │   ├── scene3-threshold-experiential.png
│   │   └── scene3-threshold-tot.png
│   └── experiential/     ← full experiential scene, everything visible (3)
│       ├── scene1-column.png
│       ├── scene2-engine.png
│       └── scene3-threshold.png
└── videos/               ← record the three 10 s clips here (see below)
```

## The three videos (record them yourself — 2 minutes)

The scenes animate with `requestAnimationFrame`, which **pauses whenever the
browser window is not the active foreground window**. That makes reliable
automated recording impossible, but trivial for you to do at full quality
(real-time, full UI, any resolution) because your window is in focus:

**Windows (built-in, no install):**
1. Open the experiential scene in Chrome and click through to the visualization.
2. Press **Win + Alt + R** to start recording (Xbox Game Bar).
3. Let it run ~10 seconds, then **Win + Alt + R** again to stop.
4. The clip lands in `C:\Users\<you>\Videos\Captures` — move it here and name it
   `scene1-column.mp4`, `scene2-engine.mp4`, `scene3-threshold.mp4`.

Record these three:
- The Column — experiential:     viz/viz1/thecolumn-experiential.html
- The Engine Room — experiential: viz/viz2/theengine-experiential.html
- The Threshold — experiential:   viz/viz3/thethreshold-experiential.html

Tip for Viz 3 (and Viz 2): press play / drag the timeline so the full time
series (or the scatter cloud) fills in during the clip.
