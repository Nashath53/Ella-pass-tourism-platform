/* STATUS: RED - DO NOT EDIT unless you know JavaScript. This file is the engine of the site.
   One wrong character can break every page. Ask for help or copy the file first as a backup. */
/* ==========================================================================
   scenes.js  -  ILLUSTRATED SCENES (no photos needed)
   --------------------------------------------------------------------------
   Every card gets a small illustrated landscape drawn in SVG. The colours
   come from CSS variables, so the scenes switch to a night version in dark
   mode automatically. If you add a real photo (item.image), the photo is
   shown on top and the scene stays as the fallback.
   scene(key) returns HTML. Keys: peak, bridge, rock, falls, tea, mist,
   view, river, cafe, stay, kade.
   ========================================================================== */
(function () {
  const STAR_POS = [[40,30],[90,55],[150,25],[210,48],[270,20],[330,50],[370,28],[120,82],[300,86],[60,95]];

  function sky(sunX, sunY) {
    return '<g class="sc-stars">' + STAR_POS.map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.3"/>').join("") + "</g>" +
           '<circle class="sc-sun" cx="' + sunX + '" cy="' + sunY + '" r="17"/>';
  }
  const hills = {
    back:  '<path class="sc-h1" d="M0 150 C60 108 120 132 180 118 C240 104 300 138 400 110 L400 240 L0 240Z"/>',
    mid:   '<path class="sc-h2" d="M0 182 C80 150 140 176 220 160 C300 144 350 170 400 158 L400 240 L0 240Z"/>',
    front: '<path class="sc-h3" d="M0 214 C90 192 170 218 260 202 C320 192 360 206 400 198 L400 240 L0 240Z"/>'
  };
  const tree = (x, y, s) => '<path class="sc-h3" d="M' + x + " " + y + " l" + (-6 * s) + " " + (16 * s) + " h" + (12 * s) + 'Z M' + x + " " + (y - 9 * s) + " l" + (-5 * s) + " " + (14 * s) + " h" + (10 * s) + 'Z"/>';

  const SCENES = {
    peak:   () => sky(310, 62) + hills.back + '<path class="sc-h1" d="M120 240 L205 72 L300 240Z"/><path class="sc-snow" d="M205 72 L190 104 L205 96 L220 106Z"/>' + hills.mid + hills.front + tree(60, 190, 1) + tree(344, 196, 1.1),
    bridge: () => sky(70, 60) + hills.back + hills.mid +
              '<rect class="sc-stone" x="60" y="146" width="280" height="10" rx="2"/><rect class="sc-stone" x="68" y="156" width="264" height="52"/>' +
              [0,1,2,3,4,5,6,7,8].map((i) => { const x = 76 + i * 28; return '<path class="sc-h2" d="M' + x + " 208 V186 a10 10 0 0 1 20 0 V208Z\"/>"; }).join("") +
              '<g class="sc-train"><rect x="120" y="135" width="64" height="11" rx="3"/><rect class="sc-win" x="126" y="138" width="8" height="4" rx="1"/><rect class="sc-win" x="140" y="138" width="8" height="4" rx="1"/><rect class="sc-win" x="154" y="138" width="8" height="4" rx="1"/></g>' +
              hills.front + tree(30, 198, 1.1) + tree(372, 196, 1.2),
    rock:   () => sky(70, 56) + hills.back + '<path class="sc-rock" d="M140 240 L168 124 L212 82 L262 108 L296 240Z"/><path class="sc-rock2" d="M212 82 L262 108 L296 240 L240 240 L226 130Z"/>' + hills.mid + hills.front + tree(70, 192, 1) + tree(330, 196, 1.2),
    falls:  () => sky(330, 52) + hills.back + '<path class="sc-h1" d="M120 70 L280 70 L300 150 L100 150Z"/><rect class="sc-fall" x="188" y="70" width="22" height="120" rx="6"/><rect class="sc-fall" x="214" y="70" width="8" height="118" rx="4"/><ellipse class="sc-fall" cx="204" cy="196" rx="44" ry="8"/>' + hills.mid + hills.front + tree(56, 190, 1.1) + tree(350, 190, 1),
    tea:    () => sky(320, 56) + hills.back + hills.mid +
              '<path class="sc-h3" d="M0 214 C90 192 170 218 260 202 C320 192 360 206 400 198 L400 240 L0 240Z"/>' +
              [168,182,196,210,224].map((y, i) => '<path class="sc-tea" d="M0 ' + y + " C100 " + (y - 16 + i) + " 220 " + (y + 8) + " 400 " + (y - 12) + '"/>').join("") + tree(46, 150, 1),
    mist:   () => sky(300, 70) + hills.back + '<ellipse class="sc-mist" cx="120" cy="150" rx="150" ry="18"/>' + hills.mid + '<ellipse class="sc-mist" cx="290" cy="176" rx="170" ry="16"/>' + hills.front + tree(50, 170, 1.3) + tree(76, 180, 1) + tree(340, 174, 1.4) + '<ellipse class="sc-mist" cx="200" cy="214" rx="220" ry="14"/>',
    view:   () => sky(200, 70) + hills.back + '<ellipse class="sc-mist" cx="90" cy="130" rx="90" ry="12"/><ellipse class="sc-mist" cx="320" cy="118" rx="80" ry="10"/>' + hills.mid + hills.front + '<rect class="sc-stone" x="168" y="190" width="40" height="5" rx="2"/><rect class="sc-stone" x="172" y="195" width="4" height="9"/><rect class="sc-stone" x="200" y="195" width="4" height="9"/>',
    river:  () => sky(70, 60) + hills.back + hills.mid + '<path class="sc-water" d="M120 240 C140 200 190 190 220 170 C250 150 330 150 400 140 L400 240Z"/><path class="sc-ripple" d="M170 214 q12 -6 24 0 t24 0 M230 192 q12 -6 24 0 t24 0"/><ellipse class="sc-stone" cx="108" cy="214" rx="20" ry="9"/><ellipse class="sc-stone" cx="340" cy="190" rx="16" ry="7"/>' + hills.front,
    cafe:   () => sky(330, 56) + hills.back + hills.mid + '<rect class="sc-wall" x="140" y="132" width="120" height="76"/><path class="sc-roof" d="M130 134 L200 98 L270 134Z"/><rect class="sc-glow" x="156" y="152" width="32" height="30" rx="3"/><rect class="sc-glow" x="212" y="152" width="32" height="30" rx="3"/><rect class="sc-door" x="196" y="170" width="8" height="38"/><path class="sc-steam" d="M300 160 q-6 -12 0 -22 q6 -10 0 -20"/><rect class="sc-wall" x="288" y="164" width="24" height="24" rx="5"/>' + hills.front + tree(60, 190, 1.2),
    stay:   () => sky(320, 56) + hills.back + hills.mid + '<rect class="sc-wall" x="120" y="138" width="140" height="68"/><path class="sc-roof" d="M110 140 L190 96 L270 140Z"/><rect class="sc-glow" x="136" y="156" width="26" height="26" rx="3"/><rect class="sc-glow" x="218" y="156" width="26" height="26" rx="3"/><rect class="sc-door" x="180" y="168" width="20" height="38" rx="2"/>' + hills.front + tree(60, 190, 1.2) + tree(336, 194, 1),
    tuktuk: () => sky(330, 56) + hills.back + hills.mid + '<rect class="sc-road" x="0" y="196" width="400" height="44"/><path class="sc-line" d="M0 218 H400"/>' +
              '<g transform="translate(112 112)"><path class="sc-veh" d="M8 78 L8 46 Q8 22 40 22 L128 22 Q150 22 156 52 L164 78Z"/><path class="sc-roof" d="M16 24 Q86 -12 146 24Z"/><rect class="sc-win" x="30" y="36" width="52" height="26" rx="4"/><rect class="sc-win" x="92" y="36" width="34" height="26" rx="4"/><circle class="sc-wheel" cx="46" cy="82" r="15"/><circle class="sc-wheel" cx="140" cy="82" r="15"/><circle class="sc-glow" cx="164" cy="60" r="5"/></g>',
    car:    () => sky(60, 56) + hills.back + hills.mid + '<rect class="sc-road" x="0" y="196" width="400" height="44"/><path class="sc-line" d="M0 218 H400"/>' +
              '<g transform="translate(86 112)"><path class="sc-veh" d="M6 78 L6 56 Q6 44 24 40 L58 18 Q66 12 80 12 H146 Q162 12 174 36 L200 44 Q214 48 214 62 V78Z"/><path class="sc-win" d="M68 22 L96 22 L96 44 L52 44Z M104 22 H146 Q154 22 162 44 H104Z"/><circle class="sc-wheel" cx="52" cy="80" r="17"/><circle class="sc-wheel" cx="170" cy="80" r="17"/><circle class="sc-glow" cx="210" cy="60" r="5"/></g>',
    kade:   () => sky(320, 56) + hills.back + hills.mid + '<rect class="sc-wall" x="120" y="146" width="150" height="62"/><path class="sc-awn" d="M112 146 H278 L268 124 H122Z"/><rect class="sc-glow" x="136" y="164" width="40" height="30" rx="3"/><rect class="sc-door" x="206" y="166" width="22" height="42"/>' + hills.front + tree(56, 192, 1.1)
  };

  function scene(key) {
    const draw = SCENES[key] || SCENES.mist;
    return '<div class="scene" aria-hidden="true"><svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" focusable="false">' + draw() + "</svg></div>";
  }

  window.EC = window.EC || {};
  window.EC.scene = scene;
})();
