import { Account, ec, stark, hash, CallData } from "starknet";
import fs from "fs";
import path from "path";
import { MADARA_PROVIDER, CLASS_HASH } from "../config.js";

export async function GenerateAccount() {
  const privateKey = stark.randomAddress();
  const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);

  const OZaccountClassHash = CLASS_HASH;
  const OZaccountConstructorCallData = CallData.compile({
    publicKey: starkKeyPub,
  });
  const OZcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPub,
    OZaccountClassHash,
    OZaccountConstructorCallData,
    0
  );

  return {
    address: OZcontractAddress,
    publicKey: starkKeyPub,
    privateKey: privateKey,
    calldata: OZaccountConstructorCallData,
  };
}

export async function DeployAccount(address, privateKey, publicKey) {
  const OZaccount = new Account(MADARA_PROVIDER, address, privateKey, "1");
  const OZaccountConstructorCallData = CallData.compile({
    publicKey: publicKey,
  });
  const { transaction_hash, contract_address } = await OZaccount.deployAccount({
    classHash: CLASS_HASH,
    constructorCalldata: OZaccountConstructorCallData,
    addressSalt: publicKey,
  });

  await MADARA_PROVIDER.waitForTransaction(transaction_hash);

  console.log("✅ New AA Wallet created");
  console.log({
    transactionHash: transaction_hash,
    address: contract_address,
  });
}
