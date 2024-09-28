use dep::std;
mod sudoku;

// Given a 4x4 sudoku board with array signal input "question" and "solution", check if the solution is correct.

fn main(answer: [Field; 16]) {
    let mut question:[Field; 16] = [1, 0, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1];
    // check if question and answer match
    sudoku::sudoku(question, answer)
}
