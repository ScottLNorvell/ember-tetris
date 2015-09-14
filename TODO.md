# TODO

- [x] implement game over (better)
- [x] implement reset
- [ ] implement high score? (localstorage?)
- [ ] reverse rotation?
- [ ] do animation
- [ ] center "next piece" in circle
- [ ] Style!

### Notes
look at template strings
see if there is an ES6 Dash set!

### Game state
- [x] directly below next piece
- [x] Always show controls description
    - [ ] make this hideable?
- [x] if `isPlaying` show pause button? Maybe
- [x] if `isPaused` show paused state
- [x] if `gameOver` show game over state with new game button
- [ ] MAKE ALL OF THESE MODALS? (ember-modal?)

### Clear Lines
- [ ] hide tetromino
- [x] check lines and mark as type 'x' if full `checkLines`
    + [x] return `[21,21]` from `checkLines` to decide if we want to
- [x] remove type 'x' lines `deleteLines`
- [x] determine which lines are removed ([21,20], etc...)
- [x] iterate through squares and increment `y` by the amount of deleted lines below square
- [x] `clear()` and reset `squareSet`
- [x] remove deleted lines from `lines` and adjust down
- [ ] show tetromino
- [ ] determine some sweet animation!

### Next Piece
- [ ] make up next SVG
- [ ] reuse ttr-tetromino component (and make more generic, i.e. fill with values instead of bind to them from service)
- [ ] put next piece or 2 in it...

### Refactor
- [x] make controls service (for controls)

### Game Over
- [x] if reset Tetromino cannot be played === 'game over'
    - [ ] Currently only console logs... 
- [ ] pause the game
- [ ] ability to reset the board...

### Reset Board
- [x] resetTetromino
- [x] clear 'playedSquares'
- [x] clear squareSet
- [x] clear lines
- [x] resetScore
- [x] resetBag
- [ ] push score into record of games? (high score?)
- [x] setAutoFall

### Addon?
- can install basic app with npm
- other features (like animation) are hooks? (`willClearLines`, `linesDidClear`, etc...)

### Refactor to addon!
I think this is next...

### Write tests!
Cause why not?
