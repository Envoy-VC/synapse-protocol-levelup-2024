import {
  BarretenbergBackend,
  type CompiledCircuit,
} from '@noir-lang/backend_barretenberg';
import { type InputMap, Noir } from '@noir-lang/noir_js';
import { readContract } from '@wagmi/core';
import circuits from 'public/circuits.json';
import { toHex } from 'viem';

import { sudokuConduitConfig, wagmiConfig } from './viem';

export const proveSudokuBoard = async () => {
  const circuit = circuits as CompiledCircuit;
  const backend = new BarretenbergBackend(circuit);
  const noir = new Noir(circuit);
  await noir.init();
  await backend.instantiate();

  const b = await readContract(wagmiConfig, {
    ...sudokuConduitConfig,
    functionName: 'getBoard',
  });
  const board = [...b];

  board[0] = 1;
  board[5] = 2;
  board[8] = 4;
  board[15] = 1;

  const input: InputMap = {
    answer: board,
  };

  const { witness } = await noir.execute(input);
  const proof = await backend.generateProof(witness);

  const verified = await readContract(wagmiConfig, {
    ...sudokuConduitConfig,
    functionName: 'solveBoard',
    args: [toHex(proof.proof)],
  });
  return verified;
};
