# Island cursors

Original code-authored SVG icons matching the island sound and motion controls:
deep green `#092627`, cream `#f4ebd6`, and a fine `#ebe6d5` border.

All three rings have a 36 px outer diameter, with a lighter translucent fill
(65% opacity for browsing and 72% for actions and inspection).
Each asset is 40 × 40 px, including transparent padding, with its active point at
(20, 20). The browser renders
and moves the cursor directly; no pointer-following DOM element or JavaScript is
used. Browse uses a dot, actions use the homepage button's diagonal arrow, and
inspection uses a magnifier. CSS limits the set to fine hover pointers on the
404 page, keeps text-entry cursors native, and retains system cursors in forced
colors and when an SVG cannot load.
