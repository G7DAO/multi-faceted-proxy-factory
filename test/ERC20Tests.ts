import { debug } from "debug";

const hre = require("hardhat");
const ethers = hre.ethers;
import { dc, assert, expect, toWei, debuglog } from "../scripts/common";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { G7DAODiamond } from "../typechain-types";
const util = require("util");

debug.enable("G7DAO:*")
export function suite () {
  describe("ERC20 Testing", async function () {
    let signers: SignerWithAddress[];
    let owner: string;
    let gdAddr1: G7DAODiamond;
    const G7DAODiamond = dc.G7DAODiamond as G7DAODiamond;

    before(async () => {
      signers = await ethers.getSigners();
      owner = signers[0].address;
      gdAddr1 = await G7DAODiamond.connect(signers[1]);
    })

    it("Testing ERC20 transfer", async () => {
      const gnusSupply = await G7DAODiamond.totalSupply();
      assert(gnusSupply.eq(toWei(4000)), `G7DAO Supply should be 4000.0, but is ${gnusSupply}`);

      const ownerSupply = await G7DAODiamond.balanceOf(owner);
      assert(ownerSupply.gt(ethers.utils.parseEther("100.0")), `Owner balanceOf should be > 100, but is ${ethers.utils.formatEther(ownerSupply)}`);

      await G7DAODiamond.transfer(signers[3].address, toWei(150));
    });

  });
}
