let pieces = [
  " ",
  "♔",
  "♕",
  "♖",
  "♗",
  "♘",
  "♙",
  "♚",
  "♛",
  "♜",
  "♝",
  "♞",
  "♟",
];

let moves = [king, queen, rook, bishop, knight, pawn];
let pieceNum = moves.length();

let initialState = {
  turn: 0,
  board: [1, 2, 3, 4, 5, 6, 0, 0, 0, 0, 12, 11, 10, 9, 8, 7],
};

function canMove(state, from, to) {
  let pFrom = state.board[from];
  if (pFrom == 0) return false;

  let p = owner(pFrom);
  if (state.turn != p) return false;

  let pTo = state.board[to];
  if (pTo != 0 && owner(pTo) == p) return false; // There is no castling ( We don't need castling anyway right ? )

  return moves[piece(pFrom)](state, from, to);
}

function rook(state, from, to) {
  let smaller = Math.min(from, to);
  let bigger = Math.max(from, to);
  let board = state.board;
  for (let i = smaller + 1; i < bigger; ++i) {
    if (board[i] != 0) return false;
  }
  return true;
}

function bishop(state, from, to) {
  let smaller = Math.min(from, to);
  let bigger = Math.max(from, to);
  let board = state.board;
  for (let i = smaller + 2; i < bigger; i = i + 2) {
    if (i < board.length && board[i] != 0) return false;
  }
  return i == bigger;
}

function queen(state, from, to) {
  return rook(state, from, to) || bishop(state, from, to);
}

function knight(state, from, to) {
  let diff = Math.abs(to - from);
  return diff == 2 || diff == 3;
}

function pawn(state, from, to) {
  let dir = state.turn == 0 ? 1 : -1;
  return (
    from + dir == to ||
    (initialState.board[from] == state.board[from] &&
      state.board[from + dir] == 0 &&
      from + 2 * dir == to)
  );
}

function king(state, from, to) {
  let diff = Math.abs(to - from);
  return diff == 1;
}

function owner(p) {
  return Math.floor((p - 1) / pieceNum);
}

function piece(p) {
  let q = p - 1;
  return q < pieceNum ? q : q - pieceNum;
}

function encodeNum(xs, x) {
  return xs + String.fromCharCode(97 + x);
}
function decodeNum(xs, i) {
  return xs.charCodeAt(i) - 97;
}

function encodeState(state) {
  let board = state.board;
  let result = encodeNum("", state.turn);
  for (let i = 0; i < board.length; ++i) {
    result = encodeNum(result, board[i]);
  }
  return result;
}

function decodeState(b) {
  let board = [];
  let state = {};
  state.turn = decodeNum(b, 0);
  state.board = board;
  for (let i = 1; i < b.length; ++i) {
    board[i - 1] = decodeNum(b, i);
  }
  return state;
}

function getState() {
  let x = new URL(window.location).searchParams.get("state");
  return !x ? initialState : decodeState(x);
}

function moving(state, from) {
  return function () {
    let opts = [];
    for (let to = 0; to < state.board.length; ++to) {
      let td = document.getElementById("b" + to);
      let list = td.classList;
      list.remove("source");
      if (list.contains("target")) {
        list.remove("target");
        td.onclick = function () {
          return false;
        };
      }
      if (from == to) {
        list.add("source");
      }

      if (canMove(state, from, to)) {
        list.add("target");
        td.onclick = function () {
          state.board[to] = state.board[from];
          state.board[from] = 0;
          state.turn = 1 - state.turn;
          window.location.href = "index.html?state=" + encodeState(state);
        };
      }
    }
  };
}

function threatened(state, p) {
  let res = false;
  let t = state.turn;
  state.turn = 1 - t;
  for (let i = 0; i < state.board.length; ++i) {
    res = canMove(state, i, p);
    if (res) break;
  }
  state.turn = t;
  return res;
}

function drawState(state) {
  let table = document.createElement("table");
  table.classList.add("board");
  let row = document.createElement("tr");
  table.appendChild(row);

  let board = state.board;

  for (let i = 0; i < board.length; ++i) {
    let td = document.createElement("td");
    td.classList.add(i % 2 == 0 ? "b" : "w");
    let p = board[i];
    td.textContent = pieces[p];
    td.setAttribute("id", "b" + i);
    if (owner(p) == state.turn) {
      td.classList.add("clickable");
      td.onclick = moving(state, i);
      if (threatened(state, i)) {
        td.classList.add("danger");
      }
    }
    row.appendChild(td);
  }

  let note = document.createElement("div");
  note.textContent = "Current state: " + encodeState(state);

  let turn = document.createElement("div");
  turn.textContent = (state.turn == 0 ? "White" : "Black") + "'s move:";

  let body = document.getElementById("main");
  body.appendChild(note);
  body.appendChild(turn);
  body.appendChild(table);
}

drawState(getState())
