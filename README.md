# 1D Chess Game

This document explains the functionality and structure of a simple 1D chess game implemented in JavaScript. The game allows two players to move chess pieces in a linear arrangement.

### Game Link

https://ahmad-faraj.github.io/1D-Chess/

## Game Overview

The game board is represented as a 1D array of length 16, where each element corresponds to a square on the board. The chess pieces are represented by integers, and each piece has a specific movement pattern defined in the game logic.

### Chess Pieces Representation

The chess pieces are represented by the following characters:

| Number | Piece     | Unicode Symbol |
|--------|-----------|----------------|
| 0      | Empty     | " "            |
| 1      | White King| ♔              |
| 2      | White Queen| ♕             |
| 3      | White Rook | ♖             |
| 4      | White Bishop | ♗           |
| 5      | White Knight | ♘           |
| 6      | White Pawn | ♙             |
| 7      | Black King| ♚              |
| 8      | Black Queen| ♛             |
| 9      | Black Rook | ♜             |
| 10     | Black Bishop | ♝           |
| 11     | Black Knight | ♞           |
| 12     | Black Pawn | ♟             |

### Initial Game State

The initial state of the game is defined by an object `initialState`, which consists of:
- `turn`: Indicates whose turn it is (0 for White, 1 for Black).
- `board`: An array representing the board. Each number corresponds to a specific piece.

```javascript
var initialState = {
  turn: 0,
  board: [1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 12, 11, 10, 9, 8, 7],
};
```

### Movement Functions

Each type of chess piece has a corresponding movement function. The `canMove` function is used to check if a move from one square to another is valid based on the piece type and the current board state.

- **King (♔, ♚)**: Can move one square in either direction.
  - `king(state, from, to)`

- **Queen (♕, ♛)**: Can move like both a rook and a bishop.
  - `queen(state, from, to)`

- **Rook (♖, ♜)**: Can move horizontally any number of squares, but cannot jump over other pieces.
  - `rook(state, from, to)`

- **Bishop (♗, ♝)**: Can move in the squares of its color, but cannot jump over other pieces that exists in its square color.
  - `bishop(state, from, to)`

- **Knight (♘, ♞)**: Can jump two or three squares in either direction.
  - `knight(state, from, to)`

- **Pawn (♙, ♟)**: Can move one square forward, or two squares forward on its first move. It cannot move backward.
  - `pawn(state, from, to)`

### Additional Functions

- **`owner(p)`**: Determines the owner (player) of a piece based on its number.
- **`piece(p)`**: Returns the type of a piece based on its number.
- **`threatened(state, p)`**: Checks if a given position `p` is under threat by any opposing piece.

### Encoding and Decoding

The game state is encoded and decoded to allow the game to be played in a browser with URL parameters. The `encodeState` function encodes the state as a string, and the `decodeState` function decodes it back to a usable state object.

- **`encodeState(state)`**: Converts the game state to a string for use in the URL.
- **`decodeState(b)`**: Converts a string from the URL back into the game state.

### User Interface

The game is displayed using HTML elements where each piece is represented in a table format. Players interact with the board by clicking on pieces to select them and clicking on a target square to make a move.

- **`drawState(state)`**: Renders the board based on the current game state.
- **`moving(state, from)`**: Sets up the interaction for a piece to be moved from a selected square.

### Example Gameplay

1. The game starts with White's turn (`state.turn = 0`).
2. A player clicks on a piece to select it.
3. The valid target squares for that piece are highlighted.
4. The player clicks on a target square to move the piece.
5. The game state is updated, and the turn alternates between the two players.

### Inspiration

this was inspired from Iavor S. Diatchki
