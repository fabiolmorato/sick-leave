# Sick Leave

A web based game written in TypeScript. No external libraries required (other than build tools). This project involved the creation of an extendable 2D game engine and recreation of the Sick Leave game on top of this engine.

The engine can be extended by adding plugins on top of it. For instance, there are 4 plugins in this repository:

1. `src/engine/utils/plugins/collision-box.ts` - draws a collision box around every entity when activated (in this particular game that's done by pressing `c`)
2. `src/engine/utils/plugins/debug-grid.ts` - draws a grid on top of the game showing the coordinate system (activated by pressing `g`)
3. `src/game/plugins/input-handler.ts` - a plugin made specifically for this game to support for touch controls on html elements
4. `src/game/plugins/keyboard-handler.ts` - a plugin made specifically for this game to support keyboard controls

Checkout `src/game/index.ts` to see how it all works in the background.

### Build

To build this, execute

```bash
npm run build
```

to generate the JavaScript code from the TypeScript code. You can either run this from a web server or open the `index.html` file directly on your browser.

### About

Sick Leave is a Flash game the project's author used to play in his childhood (can't remember where unfortunately). The idea behind the original game is to remain sick for as long as you can, so you won't have to go to work - this game attempts to recreate that.

### Live demo

You can play this at https://maroto.dev/sick-leave on both your computer and phone.
