import { RpcProvider, Account, hash } from "starknet";
import { RPC_URL, ACCOUNT } from "../config.js";

import { SIERRA_CODE } from "../contracts/AA_SIERRA.js";

export async function deploy() {
  try {
    const deploy = await ACCOUNT.deploy({
      classHash: hash.computeContractClassHash(SIERRA_CODE),
      constructorCalldata: "0x1",
    });

    return {
      success: true,
      data: {
        classHash: hash.computeContractClassHash(SIERRA_CODE),
        transactionHash: deploy.transaction_hash,
        contractAddress: deploy.contract_address,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
