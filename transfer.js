import fs from "fs";
import { TransferWithSigner } from "./helper/transfer.js";
import { pickRandom } from "./helper/randomize.js";

const accountList = fs.readFileSync("./account.txt", "utf-8").split("\n");

while (true) {
  await new Promise((r) => setTimeout(r, 3000));
  let random = pickRandom(accountList, 20);
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
