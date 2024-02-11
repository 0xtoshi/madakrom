import { RPC_URL, ACCOUNT, MADARA_PROVIDER } from "../config.js";
import { Contract, Account } from "starknet";
import { ERC20 } from "../ABI/ERC20.js";
const CONTRACT_ADDRESS =
  "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

export async function TransferTx(address) {
  try {
    const contract = new Contract(ERC20.abi, CONTRACT_ADDRESS, MADARA_PROVIDER);
    let result = contract.populate("transfer", {
      recipient: address,
      amount: {
        low: 1e24,
        high: 0,
      },
    });

    let txhash = await ACCOUNT.execute(result, undefined);
    return {
      success: true,
      data: {
        transactionHash: txhash.transaction_hash,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export async function TransferWithSigner(address, privateKey) {
  try {
    const contract = new Contract(ERC20.abi, CONTRACT_ADDRESS, MADARA_PROVIDER);
    let result = contract.populate("transfer", {
      recipient: address,
      amount: {
        low: 1e2,
        high: 0,
      },
    });

    const signer = new Account(MADARA_PROVIDER, address, privateKey, "1");

    let txhash = await signer.execute(result, undefined);
    return txhash.transaction_hash;
  } catch (err) {
    //console.log("Transfer Failed");
  }
}
