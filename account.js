import fs from "fs";
import {
  TransferWithSigner,
  TransferWithSignerAndreceiver,
} from "./helper/transfer.js";
import { pickRandom } from "./helper/randomize.js";
import { TRANSFER_PER_REQUEST } from "./config.js";
import { GenerateAccount, DeployAccount } from "./helper/deployAccount.js";

while (true) {
  await new Promise((r) => setTimeout(r, 3000));
  try {
    const accountList = fs.readFileSync("./account.txt", "utf-8").split("\n");
    let random = pickRandom(accountList, TRANSFER_PER_REQUEST);
    var accountArray = random.filter(function (el) {
      return el != "" && el !== undefined;
    });

    let deployAccount = await GenerateAccount();

    let tx = [];
    for (let list of accountArray) {
      let signer = list.split(",");
      let address = signer[0];
      let privateKey = signer[1];

      tx.push(
        TransferWithSignerAndreceiver(
          address,
          privateKey,
          deployAccount.address
        )
      );
    }

    let data = await Promise.all(tx);
    if (data) {
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
    }
    //console.log(data);
  } catch (err) {
    //console.log(`Error Boskuuuu`);
  }
}
