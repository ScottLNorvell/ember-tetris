# TODO

- [ ] 

### Notes
look at template strings
see if there is an ES6 Dash set!


#### Cyan (I)
x 0 0 0 0
y 0 1 2 3
#### Yellow (O)
x 0 1 0 1
y 0 0 1 1
#### Purple (T)
x 0 1 2 1
y 0 0 0 1
#### Green (S)
x 1 2 0 1
y 0 0 1 1
#### Red (Z)
x 0 1 1 2
y 0 0 1 1
#### Blue (J)
x 1 1 0 1
y 0 1 2 2
#### Orange (L)
x 0 0 0 1
y 0 1 2 2

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

### Game Over
- [ ] if reset Tetromino cannot be played === 'game over'
