/* eslint-disable @typescript-eslint/no-non-null-assertion -- safe */
import { encodeAbiParameters } from 'viem';

import { stablecoinConduitConfig, sudokuConduitConfig } from './viem';

const ConduitMessage = {
  name: 'staticStruct',
  inputs: [
    {
      components: [
        {
          name: 'sender',
          type: 'address',
        },
        {
          name: 'recipient',
          type: 'address',
        },
        {
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'ConduitMessage',
      type: 'tuple',
    },
  ],
} as const;

const StablecoinMessage = {
  name: 'staticStruct',
  inputs: [
    {
      components: [
        {
          name: 'sender',
          type: 'address',
        },
        {
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'StableCoinMessage',
      type: 'tuple',
    },
  ],
} as const;

const SudokuMessage = {
  name: 'staticStruct',
  inputs: [
    {
      components: [
        {
          name: 'position',
          type: 'uint8',
        },
        {
          name: 'value',
          type: 'uint8',
        },
      ],
      name: 'SudokuMessage',
      type: 'tuple',
    },
  ],
} as const;

export const getStabilityMessage = (value: bigint, sender: `0x${string}`) => {
  const encodedStablecoinMsg = encodeAbiParameters(StablecoinMessage.inputs, [
    {
      sender,
      value,
    },
  ]);

  const data = encodeAbiParameters(ConduitMessage.inputs, [
    {
      sender,
      recipient: stablecoinConduitConfig.address,
      data: encodedStablecoinMsg,
    },
  ]);

  return {
    sender,
    recipient: stablecoinConduitConfig.address,
    receiver: 0,
    data,
  };
};

export const getSudokuMessage = (
  position: number,
  value: number,
  sender: `0x${string}`
) => {
  const encodedSudokuMsg = encodeAbiParameters(SudokuMessage.inputs, [
    {
      position,
      value,
    },
  ]);

  const data = encodeAbiParameters(ConduitMessage.inputs, [
    {
      sender,
      recipient: sudokuConduitConfig.address,
      data: encodedSudokuMsg,
    },
  ]);

  return {
    sender,
    recipient: stablecoinConduitConfig.address,
    receiver: 0,
    data,
  };
};

export const calculateEntropy = (board: number[][]): number => {
  const targetSum = 10; // Target sum for a 4x4 Sudoku row/column (1+2+3+4)
  let totalEntropy = 0;
  const totalChecks = 8; // 4 rows + 4 columns

  // Helper function to check if an array contains all numbers 1-4
  function isValid(arr: number[]): boolean {
    const validSet = new Set([1, 2, 3, 4]);
    const arrSet = new Set(arr.filter((n) => n !== 0)); // Ignore zeros (unfilled tiles)
    return (
      arrSet.size === validSet.size && [...arrSet].every((n) => validSet.has(n))
    );
  }

  // Helper function to calculate normalized entropy based on sum
  function sumEntropy(arr: number[]): number {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return 1 - Math.abs(targetSum - sum) / targetSum; // Closer to targetSum results in higher entropy
  }

  // Helper function to calculate entropy for a valid set of numbers
  function validSetEntropy(arr: number[]): number {
    return isValid(arr) ? 1 : 0.5; // Full entropy if valid set, partial if not
  }

  // Helper function to calculate partial fill contribution
  function partialFillEntropy(arr: number[]): number {
    const filledCount = arr.filter((n) => n !== 0).length;
    return filledCount / 4; // Contribution based on the percentage of filled values
  }

  // Iterate over rows and columns
  for (let i = 0; i < 4; i++) {
    const row = board[i];
    const column = [board[0]![i]!, board[1]![i]!, board[2]![i]!, board[3]![i]!];

    // Row entropy
    const rowEntropy =
      sumEntropy(row!) * validSetEntropy(row!) * partialFillEntropy(row!);
    totalEntropy += rowEntropy;

    // Column entropy
    const columnEntropy =
      sumEntropy(column) * validSetEntropy(column) * partialFillEntropy(column);
    totalEntropy += columnEntropy;
  }

  // Final entropy is the average of all checks, normalized between 0 and 1
  const finalEntropy = totalEntropy / totalChecks;

  return finalEntropy * 10 ** 5;
};
