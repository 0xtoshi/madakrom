import fs from "fs";
import { TransferWithSigner } from "./helper/transfer.js";
import { pickRandom } from "./helper/randomize.js";
import { TRANSFER_PER_REQUEST } from "./config.js";

while (true) {
  await new Promise((r) => setTimeout(r, 3000));
  const accountList = fs.readFileSync("./account.txt", "utf-8").split("\n");
  let random = pickRandom(accountList, TRANSFER_PER_REQUEST);
  var accountArray = random.filter(function (el) {
    return el != "" && el !== undefined;
  });

  let tx = [];
  for (let list of accountArray) {
    let signer = list.split(",");
    let address = signer[0];
    let privateKey = signer[1];

    tx.push(TransferWithSigner(address, privateKey));
  }

  try {
    let data = await Promise.all(tx);
    console.log(data);
  } catch (err) {
    console.log(`Error Boskuuuu`);
  }
}
