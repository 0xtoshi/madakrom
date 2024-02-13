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
    let tx = [];
    let accounts = [];
    for (let list of accountArray) {
      let signer = list.split(",");
      let address = signer[0];
      let privateKey = signer[1];

      let deployAccount = await GenerateAccount();

      console.log(deployAccount.address);
      /*
      tx.push(
        TransferWithSignerAndreceiver(
          address,
          privateKey,
          deployAccount.address
        )
      );
      await new Promise((r) => setTimeout(r, 20000));
      let deploy = await DeployAccount(
        deployAccount.address,
        deployAccount.privateKey,
        deployAccount.publicKey
      );

      console.log(deploy);
      //console.log(deployAA);

      fs.appendFileSync(
        "./account.txt",
        `${deployAccount.address},${deployAccount.privateKey}\n`
      );
      */
    }

    //    let data = await Promise.all(tx);

    //console.log(data);
  } catch (err) {
    //console.log(`Error Boskuuuu`);
  }
}
