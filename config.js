import { Account, RpcProvider } from "starknet";
export const RPC_URL = "http://127.0.0.1:9944";

export const MADARA_PROVIDER = new RpcProvider({
  nodeUrl: RPC_URL,
});

//default account madara 0x4
export const ACCOUNT = new Account(
  MADARA_PROVIDER,
  "0x4",
  "0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d",
  "1"
);

export const TRANSFER_PER_REQUEST = 20; // Down jika terlalu banyak
