export type FieldType = {
  row: number;
  column: number;
  opened: boolean;
  flagged: boolean;
  mined: boolean;
  exploded: boolean;
  nearMines: number;
};

export type Board = Array<Array<FieldType>>;

const createBoard = (rows: number, columns: number): Board => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0,
          };
        });
    });
};

const spreadMines = (board: Board, minesAmount: number) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowSel = Math.floor(Math.random() * rows);
    const columnSel = Math.floor(Math.random() * columns);

    if (!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true;
      minesPlanted++;
    }
  }
};

export const createMinedBoard = (
  rows: number,
  columns: number,
  minesAmount: number,
) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

export const cloneBoard = (board: Board): Board => {
  return board.map(rows => {
    return rows.map(field => {
      return {...field};
    });
  });
};

const getNeighbors = (board: Board, row: number, column: number) => {
  const neighbors: Array<FieldType> = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];

  rows.forEach(r => {
    columns.forEach(c => {
      const different = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;

      if (different && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
};

const safeNeighborhood = (board: Board, row: number, column: number) => {
  const safes = (result: boolean, neighbor: FieldType) =>
    result && !neighbor.mined;
  return getNeighbors(board, row, column).reduce(safes, true);
};

export const openField = (board: Board, row: number, column: number) => {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column).forEach(n =>
        openField(board, n.row, n.column),
      );
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter(n => n.mined).length;
    }
  }
};

const fields = (board: Board) => ([] as Array<FieldType>).concat(...board);
export const hadExplosion = (board: Board) =>
  fields(board).filter(field => field.exploded).length > 0;
const pending = (field: FieldType) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);
export const wonGame = (board: Board) => fields(board).filter(pending).length === 0;
export const showMines = (board: Board) => fields(board).filter(field => field.mined).forEach(field => field.opened = true);
export const invertFlag = (board: Board, row: number, column: number) => {
  const field = board[row][column];
  field.flagged = !field.flagged;
}
export const flagsUsed = (board: Board) => fields(board).filter(field => field.flagged).length;
