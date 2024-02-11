import {
  Account,
  constants,
  ec,
  json,
  stark,
  Provider,
  hash,
  CallData,
  Contract,
} from "starknet";
import fs from "fs";
import path from "path";
import { MADARA_PROVIDER } from "../config.js";
const config = JSON.parse(fs.readFileSync(path.join("./AA.json"), "utf-8"));

export async function GenerateAccount() {
  const privateKey = stark.randomAddress();
  const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);

  const OZaccountClassHash = config.classHash;
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
    classHash: config.classHash,
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
