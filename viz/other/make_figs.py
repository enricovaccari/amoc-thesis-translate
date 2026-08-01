import json, numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import rcParams

B = json.load(open('/mnt/user-data/uploads/amoc_translate_bundle.json'))
P = B['pca']; T = B['trajectory_monthly']
z  = np.array(P['depth_m']); mp = np.array(P['mean_profile'])
B1 = np.array(P['recon_basis']['pc1']); B2 = np.array(P['recon_basis']['pc2'])

# --- palette lifted from the artefact -----------------------------------
BG      = '#010811'
PANEL   = '#061524'
GRID    = '#0a2136'
LINE    = '#7fb4d9'
LINE_HI = '#cfe8ff'
AMBER   = '#ffb35c'
TEAL    = '#49b8a5'
TXT     = '#e7f0f7'
MUTED   = '#7fb4d9'

rcParams.update({
    'font.family': 'monospace',
    'font.size': 8,
    'text.color': TXT,
    'axes.labelcolor': TXT,
    'xtick.color': MUTED, 'ytick.color': MUTED,
    'axes.edgecolor': GRID, 'axes.facecolor': PANEL,
    'figure.facecolor': BG, 'savefig.facecolor': BG,
    'axes.grid': True, 'grid.color': GRID, 'grid.linewidth': 0.6,
    'axes.spines.top': False, 'axes.spines.right': False,
})

# --- anchors, recomputed exactly as deriveAnchors does ------------------
def velocity(prof, depth):
    n = len(depth); v = np.zeros(n)
    for i in range(n):
        a = max(0, i-1); b = min(n-1, i+1)
        dz = depth[b]-depth[a]
        v[i] = (prof[b]-prof[a])/dz if dz > 0 else 0
    return v

peak_idx = int(mp.argmax()); peak_sv = mp[peak_idx]; peak_z = z[peak_idx]
vmean = velocity(mp, z)
vs1 = next(z[i] for i in range(1, len(z)) if vmean[i-1] > 0 and vmean[i] <= 0)
vs2 = next(z[i] for i in range(len(z)-1, 1, -1) if vmean[i] > 0 and vmean[i-1] <= 0)
psi0 = next(z[i] for i in range(peak_idx+1, len(z)) if mp[i] <= 0)

# ===================== FIG 7.3 — three flow regimes =====================
fig, ax = plt.subplots(figsize=(5.2, 6.4))
ax.axhspan(0,     vs1,    color=LINE,  alpha=0.10, lw=0)
ax.axhspan(vs1,   vs2,    color=AMBER, alpha=0.07, lw=0)
ax.axhspan(vs2,   z[-1],  color=TEAL,  alpha=0.10, lw=0)
ax.plot(mp, z, color=LINE_HI, lw=1.8)
ax.axvline(0, color=MUTED, ls=':', lw=0.8, alpha=0.6)

for d, lab in [(vs1, f'{vs1:.1f} m  v changes sign'),
               (vs2, f'{vs2:.1f} m  v changes sign')]:
    ax.axhline(d, color=AMBER, ls='--', lw=0.9)
    ax.text(17.6, d-70, lab, color=AMBER, fontsize=7, ha='right')
ax.axhline(psi0, color=TXT, ls='-.', lw=0.9, alpha=0.75)
ax.text(17.6, psi0-70, f'{psi0:.1f} m  $\\Psi$ = 0', color=TXT, fontsize=7,
        ha='right', alpha=0.9)

ax.annotate('', xy=(psi0, psi0), xytext=(psi0, vs2))
ax.plot([1.2, 1.2], [psi0, vs2], color=TXT, lw=1.0, alpha=0.5)
ax.text(1.9, (psi0+vs2)/2, f'{vs2-psi0:.0f} m', color=TXT, fontsize=7,
        va='center', alpha=0.9)

ax.plot(peak_sv, peak_z, 'o', mfc='none', mec=AMBER, mew=1.4, ms=7)
ax.text(peak_sv-0.6, peak_z-120, f'{peak_sv:.3f} Sv @ {peak_z:.2f} m',
        color=AMBER, fontsize=7, ha='right')

ax.text(0.6, 380,  'northward upper limb',  color=LINE_HI, fontsize=7.5)
ax.text(0.6, 2600, 'southward return flow', color=AMBER,   fontsize=7.5, alpha=0.95)
ax.text(0.6, 5560, 'abyssal northward cell', color=TEAL,   fontsize=7.5)

ax.set_ylim(z[-1], 0); ax.set_xlim(-1.2, 18.2)
ax.set_xlabel('overturning streamfunction $\\Psi$ (Sv)')
ax.set_ylabel('depth (m)')
fig.tight_layout()
fig.savefig('/home/claude/figs/fig73_flow_regimes.pdf')
fig.savefig('/home/claude/figs/fig73_flow_regimes.png', dpi=200)
plt.close(fig)

# ============ FIG 7.4 — Psi and its slope, side by side =================
fig, (a1, a2) = plt.subplots(1, 2, figsize=(7.4, 5.6), sharey=True)

a1.plot(mp, z, color=LINE_HI, lw=1.8)
a1.axvline(0, color=MUTED, ls=':', lw=0.8, alpha=0.6)
a1.plot(peak_sv, peak_z, 'o', mfc='none', mec=AMBER, mew=1.4, ms=7)

# tangents at three depths: above peak, below peak, abyssal
for zt, lab in [(500, None), (2500, None), (5500, None)]:
    i = int(np.abs(z-zt).argmin())
    slope = vmean[i]            # dPsi/dz
    dz = 620
    zz = np.array([z[i]-dz, z[i]+dz])
    xx = mp[i] + slope*(zz - z[i])
    a1.plot(xx, zz, color=AMBER, lw=1.1, alpha=0.95)
    a1.plot(mp[i], z[i], 'o', color=AMBER, ms=3.5)

a1.text(9.2, 560, 'slope > 0', color=AMBER, fontsize=7)
a1.text(6.0, 2380, 'slope < 0', color=AMBER, fontsize=7)
a1.text(1.2, 5330, 'slope > 0', color=AMBER, fontsize=7)
a1.set_xlim(-1.2, 18.2)
a1.set_xlabel('$\\Psi$ (Sv)')
a1.set_ylabel('depth (m)')
a1.set_title('what the canonical figure shows', fontsize=8, color=TXT, pad=10)

a2.plot(vmean*1000, z, color=TEAL, lw=1.6)
a2.axvline(0, color=TXT, ls='--', lw=1.0, alpha=0.8)
for d in (vs1, vs2):
    a2.axhline(d, color=AMBER, ls='--', lw=0.9)
    a2.text(a2.get_xlim()[1]*0.94, d-70, f'{d:.1f} m', color=AMBER,
            fontsize=7, ha='right')
a2.set_xlabel('$\\partial\\Psi/\\partial z$  ($10^{-3}$ Sv m$^{-1}$)')
a2.set_title('what the reader must compute', fontsize=8, color=TXT, pad=10)

a1.set_ylim(z[-1], 0)
fig.tight_layout()
fig.savefig('/home/claude/figs/fig74_psi_vs_slope.pdf')
fig.savefig('/home/claude/figs/fig74_psi_vs_slope.png', dpi=200)
plt.close(fig)

# ================= FIG 7.5 — extremes of the record =====================
def recon(pc1, pc2): return mp + pc1*B1 + pc2*B2
pc1 = np.array(T['pc1']); pc2 = np.array(T['pc2']); tm = T['time']
R = mp[None, :] + pc1[:, None]*B1[None, :] + pc2[:, None]*B2[None, :]
mx = R.max(axis=1)
i_hi = int(mx.argmax()); i_lo = int(mx.argmin())

fig, ax = plt.subplots(figsize=(5.4, 6.4))
for k in range(0, len(tm), 3):
    ax.plot(R[k], z, color=LINE, lw=0.35, alpha=0.10)

p_hi = R[i_hi]; p_lo = R[i_lo]
ax.plot(mp,   z, color=TXT,   lw=1.6, label='record mean')
ax.plot(p_hi, z, color=AMBER, lw=1.6, label=f'{tm[i_hi]}')
ax.plot(p_lo, z, color=TEAL,  lw=1.6, label=f'{tm[i_lo]}')
ax.axvline(0, color=MUTED, ls=':', lw=0.8, alpha=0.6)

for prof, col in ((mp, TXT), (p_hi, AMBER), (p_lo, TEAL)):
    i = int(prof.argmax())
    ax.plot(prof[i], z[i], 'o', mfc='none', mec=col, mew=1.3, ms=6)

ax.text(p_hi.max()+0.4, z[int(p_hi.argmax())]-150,
        f'{p_hi.max():.2f} Sv @ {z[int(p_hi.argmax())]:.1f} m',
        color=AMBER, fontsize=7)
ax.text(p_lo.max()+0.4, z[int(p_lo.argmax())]+300,
        f'{p_lo.max():.2f} Sv @ {z[int(p_lo.argmax())]:.1f} m',
        color=TEAL, fontsize=7)
ax.text(mp.max()+0.4, z[peak_idx]+120,
        f'{peak_sv:.3f} Sv @ {peak_z:.1f} m', color=TXT, fontsize=7)

ax.set_ylim(z[-1], 0); ax.set_xlim(-2.0, 26.5)
ax.set_xlabel('overturning streamfunction $\\Psi$ (Sv)')
ax.set_ylabel('depth (m)')
leg = ax.legend(loc='lower right', frameon=False, fontsize=7.5)
for t in leg.get_texts(): t.set_color(TXT)
fig.tight_layout()
fig.savefig('/home/claude/figs/fig75_extremes.pdf')
fig.savefig('/home/claude/figs/fig75_extremes.png', dpi=200)
plt.close(fig)

print('anchors used:')
print(f'  peak      {peak_sv:.3f} Sv @ {peak_z:.2f} m')
print(f'  vSign1    {vs1:.1f} m   vSign2 {vs2:.1f} m')
print(f'  psiZero   {psi0:.1f} m  -> separation {vs2-psi0:.0f} m')
print(f'  strongest {tm[i_hi]} {mx.max():.2f} Sv @ {z[int(p_hi.argmax())]:.1f} m')
print(f'  weakest   {tm[i_lo]} {mx.min():.2f} Sv @ {z[int(p_lo.argmax())]:.1f} m')
