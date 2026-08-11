#!/usr/bin/env python3
"""Generates the Android launcher icons and splash screens.

The artwork is not a separate asset — it is the game's own sprite data,
copied from fda.html, so the launcher icon is literally the patient and IV
pole you walk down the trail. Everything is drawn on a small logical grid and
scaled up with nearest-neighbour, so the pixels stay square at every density.
"""
import os
from PIL import Image

RES = os.path.join(os.path.dirname(__file__), '..', 'android', 'app', 'src', 'main', 'res')

# ── palette (matches the A2 table in fda.html) ──────────────────────────
BG      = (5, 8, 18, 255)        # --dark, the game background
GREEN   = (46, 232, 92, 255)     # Apple II hi-res green
WHITE   = (255, 255, 255, 255)
POLE    = (194, 204, 217, 255)
BAG     = (185, 230, 166, 255)
CLEAR   = (0, 0, 0, 0)

# ── sprites, transcribed from fda.html ─────────────────────────────────
PATIENT = [
    '...hhh..',
    '..hhhhh.',
    '..sssss.',
    '..sssss.',
    '...sss..',
    '..ggggg.',
    '.ggggggg',
    '.ggggggg',
    '.ggggggg',
    '..ddddd.',
    '..gg.gg.',
    '..gg.gg.',
    '..ss.ss.',
    '.bb..bb.',
]
POLE_SPR = [
    '.AAAA.',
    '.AAAA.',
    '.AAAA.',
    '..PP..',
    '..PP..',
    '..PP..',
    '..PP..',
    '..PP..',
    '..PP..',
    '..PP..',
    '.PPPP.',
    'W....W',
]
# the figure is a flat white silhouette here: at 48px a coloured belt reads as
# noise rather than detail. Green is reserved for the horizon line.
PAL = {'h': WHITE, 's': WHITE, 'g': WHITE, 'd': WHITE, 'b': WHITE,
       'A': BAG, 'P': POLE, 'W': POLE}


def blit(img, art, ox, oy):
    px = img.load()
    for y, row in enumerate(art):
        for x, ch in enumerate(row):
            if ch in ('.', ' '):
                continue
            if 0 <= ox + x < img.width and 0 <= oy + y < img.height:
                px[ox + x, oy + y] = PAL[ch]


def compose(with_background: bool):
    """The logical composition: horizon line, patient, IV pole.

    Kept tight (20x20) so that an integer nearest-neighbour scale still fills
    ~83% of the icon canvas at every density, including mdpi.
    """
    W, H = 20, 20
    img = Image.new('RGBA', (W, H), BG if with_background else CLEAR)
    feet = 17
    # the single horizon line, the signature of the 1985 travel screen
    for x in range(W):
        img.putpixel((x, feet), GREEN)
    blit(img, PATIENT, 2, feet - len(PATIENT))
    blit(img, POLE_SPR, 12, feet - len(POLE_SPR))
    # the IV line from bag to hand
    px = img.load()
    for x in (10, 11):
        px[x, feet - len(PATIENT) + 6] = POLE
    return img


def scale(img, size):
    return img.resize((size, size), Image.NEAREST)


def save(img, relpath):
    path = os.path.join(RES, relpath)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    return relpath


# ── launcher icons ─────────────────────────────────────────────────────
# legacy square/round: the full composition, background included
LAUNCHER = {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}
# adaptive foreground: 108dp canvas, content must stay inside the centre 72dp
FOREGROUND = {'mdpi': 108, 'hdpi': 162, 'xhdpi': 216, 'xxhdpi': 324, 'xxxhdpi': 432}

written = []
art_bg = compose(True)
art_fg = compose(False)

for dens, size in LAUNCHER.items():
    # scale by an integer factor, then pad, so pixels never smear
    factor = max(1, int(size * 0.86) // art_bg.width)
    sprite = art_bg.resize((art_bg.width * factor, art_bg.height * factor), Image.NEAREST)
    canvas = Image.new('RGBA', (size, size), BG)
    canvas.paste(sprite, ((size - sprite.width) // 2, (size - sprite.height) // 2), sprite)
    written.append(save(canvas, f'mipmap-{dens}/ic_launcher.png'))
    written.append(save(canvas, f'mipmap-{dens}/ic_launcher_round.png'))

for dens, size in FOREGROUND.items():
    safe = int(size * 0.58)          # comfortably inside the 66% safe zone
    factor = max(1, safe // art_fg.width)
    sprite = art_fg.resize((art_fg.width * factor, art_fg.height * factor), Image.NEAREST)
    canvas = Image.new('RGBA', (size, size), CLEAR)
    canvas.paste(sprite, ((size - sprite.width) // 2, (size - sprite.height) // 2), sprite)
    written.append(save(canvas, f'mipmap-{dens}/ic_launcher_foreground.png'))

# ── splash screens ─────────────────────────────────────────────────────
PORT = {'mdpi': (320, 480), 'hdpi': (480, 800), 'xhdpi': (720, 1280),
        'xxhdpi': (960, 1600), 'xxxhdpi': (1280, 1920)}

def splash(w, h):
    canvas = Image.new('RGBA', (w, h), BG)
    target = int(min(w, h) * 0.42)
    factor = max(1, target // art_fg.width)
    sprite = art_fg.resize((art_fg.width * factor, art_fg.height * factor), Image.NEAREST)
    canvas.paste(sprite, ((w - sprite.width) // 2, (h - sprite.height) // 2), sprite)
    return canvas

for dens, (w, h) in PORT.items():
    written.append(save(splash(w, h), f'drawable-port-{dens}/splash.png'))
    written.append(save(splash(h, w), f'drawable-land-{dens}/splash.png'))
written.append(save(splash(480, 800), 'drawable/splash.png'))

# ── adaptive icon background colour ────────────────────────────────────
colors = os.path.join(RES, 'values', 'ic_launcher_background.xml')
os.makedirs(os.path.dirname(colors), exist_ok=True)
with open(colors, 'w') as f:
    f.write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
            '    <color name="ic_launcher_background">#050812</color>\n</resources>\n')
written.append('values/ic_launcher_background.xml')

# the template ships a teal vector background that would win over our colour
stale = os.path.join(RES, 'drawable', 'ic_launcher_background.xml')
if os.path.exists(stale):
    os.remove(stale)
    print('removed template drawable/ic_launcher_background.xml (teal placeholder)')
stale_fg = os.path.join(RES, 'drawable-v24', 'ic_launcher_foreground.xml')
if os.path.exists(stale_fg):
    os.remove(stale_fg)
    print('removed template drawable-v24/ic_launcher_foreground.xml (Android robot)')

# ── web (PWA) icons ────────────────────────────────────────────────────
# The site installs fda.html as a progressive web app, which needs the same
# artwork again at web sizes. Generated from the identical composition above
# rather than exported by hand, so the launcher icon and the home-screen icon
# can never drift apart.
WEB = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'icons'))

def save_web(img, name):
    os.makedirs(WEB, exist_ok=True)
    img.save(os.path.join(WEB, name))
    return f'../../icons/{name}'

def web_icon(size, maskable):
    # maskable icons get cropped to a circle by the launcher, so the artwork
    # has to sit inside the middle 80% — the "safe zone" in the spec.
    fill = 0.62 if maskable else 0.86
    factor = max(1, int(size * fill) // art_bg.width)
    sprite = art_bg.resize((art_bg.width * factor, art_bg.height * factor), Image.NEAREST)
    canvas = Image.new('RGBA', (size, size), BG)
    canvas.paste(sprite, ((size - sprite.width) // 2, (size - sprite.height) // 2), sprite)
    return canvas

for size in (192, 512):
    written.append(save_web(web_icon(size, False), f'fda-{size}.png'))
    written.append(save_web(web_icon(size, True), f'fda-{size}-maskable.png'))
# iOS home-screen icon: no maskable concept, always square, never transparent
written.append(save_web(web_icon(180, False), 'fda-apple-touch.png'))
written.append(save_web(web_icon(32, False), 'fda-favicon-32.png'))

print(f'wrote {len(written)} asset files')
