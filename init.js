import fs from "fs";
import { deploy } from "./helper/deployer.js";
import { GenerateAccount, DeployAccount } from "./helper/deployAccount.js";
import { TransferTx } from "./helper/transfer.js";

console.log(`Start Deploying AA Wallet`);
let txDeploy = await deploy();
if (txDeploy.success) {
  console.log(`Deploying OpenZapeliin AA ClassHash`);
  fs.writeFileSync("./AA.json", JSON.stringify(txDeploy.data));
  console.log(`Writing Classhash in file AA.json`);
  console.log(`Success`);
  console.log(txDeploy.data);

  console.log(`Testing Generate Account`);
  let deployAccount = await GenerateAccount();
  console.log(deployAccount);

  console.log(`Waiting 20 Sec Before Sending Gas Fee`);
  await new Promise((r) => setTimeout(r, 20000));

  console.log(`Transfering Gas Fee To Account`);
  let transferTx = await TransferTx(deployAccount.address);
  console.log(transferTx);

  console.log(`Deploying Account`);
  let deployAA = await DeployAccount(
    deployAccount.address,
    deployAccount.privateKey,
    deployAccount.publicKey
  );

  console.log(deployAA);

  fs.appendFileSync(
    "./account.txt",
    `${deployAccount.address},${deployAccount.privateKey}\n`
  );
}
