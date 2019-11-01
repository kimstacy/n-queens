/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // How do we know when we've placed enough rooks?
  // How do we keep track of which piece to move if we backtrack

  // create a board with size n
  var board = new Board({n});
  var row = 0;
  var col = 0;

  while (row < n) {
    //place a new piece
    board.togglePiece(row, col); //  (r,c)
    //if conflict
    if (board.hasAnyRooksConflicts()) {
      board.togglePiece(row, col);
      col++;
      while (col === n) { // backtracking
        row--;
        if (row < 0) {
          return board.rows();
        }
        col = board.rows()[row].indexOf(1); // Figure out which col-index is occupied in a row [backtracking]
        board.togglePiece(row, col); // make existing piece disappear
        col++;
      }
    } else { // no conflict, go to the next row, start at col 0
      row++;
      col = 0;
    }
  }
  return board.rows();
  /*
  new Board({n: 4});
  board.togglePiece(r, c);
  board.hasAnyRooksConflicts();
  board.hasAnyColConflicts();
  board.hasColConflictAt();

  return board.rows();
  [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ]
 */
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 1) { return 1; }
  var board = new Board({n});
  var row = 0;
  var col = 0;
  var count = 0;

  while (row < n) {
    board.togglePiece(row, col);
    if (board.hasAnyRooksConflicts()) {
      board.togglePiece(row, col);
      col++;
      while (col === n) {
        row--;
        if (row < 0) { // No more possible solutions
          return count;
        }
        col = board.rows()[row].indexOf(1);
        board.togglePiece(row, col);
        col++;
      }
    } else { // piece has been placed
      row++;
      if (row === n) { // solution found!
        count++;
        row--;
        board.togglePiece(row, col); // Remove the last piece of this solution
        col++;
        if (col === n) { // no solution found yet (still have empty rows)
          row--;
          col = board.rows()[row].indexOf(1);
          board.togglePiece(row, col);
          col++;
        }
      } else {
        col = 0;
      }
    }
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n});
  var row = 0;
  var col = 0;

  while (row < n) {
    board.togglePiece(row, col);
    if (board.hasAnyQueensConflicts()) {
      board.togglePiece(row, col);
      col++;
      while (col === n) {
        row--;
        if (row < 0) {
          return board.rows();
        }
        col = board.rows()[row].indexOf(1);
        board.togglePiece(row, col);
        col++;
      }
    } else {
      row++;
      col = 0;
    }
  }
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n <= 1) { return 1; }
  var board = new Board({n});
  var row = 0;
  var col = 0;
  var count = 0;

  while (row < n) {
    board.togglePiece(row, col);
    if (board.hasAnyQueensConflicts()) {
      board.togglePiece(row, col);
      col++;
      while (col === n) {
        row--;
        if (row < 0) { // No more possible solutions
          return count;
        }
        col = board.rows()[row].indexOf(1);
        board.togglePiece(row, col);
        col++;
      }
    } else { // piece has been placed
      row++;
      if (row === n) { // solution found!
        count++;
        row--;
        board.togglePiece(row, col); // Remove the last piece of this solution
        col++;
        if (col === n) { // no solution found yet (still have empty rows)
          row--;
          col = board.rows()[row].indexOf(1);
          board.togglePiece(row, col);
          col++;
        }
      } else {
        col = 0;
      }
    }
  }
};
