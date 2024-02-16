import fs from "fs";
import { GenerateAccount, DeployAccount } from "./helper/deployAccount.js";
import { TransferTx } from "./helper/transfer.js";

while (true) {
  try {
    // await new Promise((r) => setTimeout(r, 2000));

    let deployAccount = await GenerateAccount();
    //console.log(deployAccount);

    //console.log(`Transfering Gas Fee To Account`);
    await TransferTx(deployAccount.address);
    //console.log(transferTx);

    await new Promise((r) => setTimeout(r, 4000)); # Waiting Block Confirmation then DEPLOY
    //console.log(`Deploying Account`);
    await DeployAccount(
      deployAccount.address,
      deployAccount.privateKey,
      deployAccount.publicKey
    );

    //console.log(deployAA);

    fs.appendFileSync(
      "./account.txt",
      `${deployAccount.address},${deployAccount.privateKey}\n`
    );
  } catch (err) {
    console.log(err);
    //console.log(err);
  }
}
