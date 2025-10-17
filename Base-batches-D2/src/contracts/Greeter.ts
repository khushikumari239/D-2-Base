import { Address } from 'viem';

const envAddress = process.env.NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS;

if (!envAddress || !envAddress.startsWith('0x') || envAddress.length !== 42) {
  throw new Error('Invalid or missing NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS in .env.local');
}

export const GREETER_CONTRACT_ADDRESS = envAddress as Address;

export const GREETER_ABI = [
  {
    type: 'function',
    name: 'greet',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string', name: 'message' }],
  },
  {
    type: 'function',
    name: 'setGreeting',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'newGreeting', type: 'string' }],
    outputs: [],
  },
] as const;

export const CONTRACT_CONFIG = {
  address: GREETER_CONTRACT_ADDRESS,
  abi: GREETER_ABI,
} as const;
