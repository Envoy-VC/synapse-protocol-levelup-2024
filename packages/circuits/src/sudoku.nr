fn less_than_eq(x: Field, y: Field) -> bool {
    x as u32 <= y as u32
}

fn is_zero(x: Field) -> bool {
    x as u32 == 0
}

fn is_equal(x: Field, y: Field) -> bool {
    x as u32 == y as u32
}

pub fn sudoku(puzzle: [Field; 16], solution: [Field; 16]) {
    // Check if all the numbers lie between 1 and 4
    for row in 0..4 {
        for col in 0..4 {
            let lt_four = less_than_eq(solution[row * 4 + col], 4);
            let gt_one = less_than_eq(1, solution[row * 4 + col]);

            assert(lt_four == gt_one);
        }
    }

    // Check if puzzle is the initial state of solution
    // If puzzle[row][col] is not zero, make sure solution[row][col] is equal to puzzle[row][col]
    // If puzzle[row][col] is zero, make sure solution [row][col] is different from puzzle[row][col]
    for row in 0..4 {
        for col in 0..4 {
            let ie_board = is_equal(solution[row * 4 + col], puzzle[row * 4 + col]);
            let iz_board = is_zero(puzzle[row * 4 + col]);

            assert(ie_board != iz_board);
        }
    }

    // Check if each row in solution has all the numbers from 1 to 4, both included
    // For each element in solution, check that this element is not equal
    // to previous elements in the same row
    for row in 0..4 {
        for col in 0..4 {
            for c in 0..col {
                assert(is_equal(solution[row * 4 + c], solution[row * 4 + col]) == false);
            }
        }
    }

    // Check if each column in solution has all the numbers from 1 to 4, both included
    // For each element in solution, check that this element is not equal
    // to previous elements in the same column
    for row in 0..4 {
        for col in 0..4 {
            for r in 0..row {
                assert(is_equal(solution[r * 4 + col], solution[row * 4 + col]) == false);
            }
        }
    }

    // for each row/ column check sum is 10
    // for each subgrid check sum is 10

    for row in 0..4 {
        let mut rowSum = 0;
        let mut colSum = 0;

        rowSum += solution[4 * row] + solution[4 * row + 1] + solution[4 * row + 2] + solution[4 * row + 3];
        colSum += solution[row] + solution[row + 4] + solution[row + 8] + solution[row + 12];

        assert(rowSum == 10);
        assert(colSum == 10);
    }
}
