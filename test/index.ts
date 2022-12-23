import { ContractTransaction } from "ethers";
const hre = require("hardhat");
const ethers = hre.ethers;
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";
import { getSelectors, Selectors, getInterfaceID } from "../scripts/FacetSelectors";
import { afterDeployCallbacks, deployDiamondFacets, deployFuncSelectors, deployG7DAODiamond } from "../scripts/deploy";
import { G7DAODiamond } from "../typechain-types";
import { dc, debuglog, assert, expect, toBN, toWei, INetworkDeployInfo } from "../scripts/common";
import { IERC165Upgradeable__factory } from "../typechain-types";
import { LoadFacetDeployments } from "../scripts/facets";
import { deployments } from "../scripts/deployments";
import * as util from "util";
import { debug } from "debug";

// other files suites to execute
import * as ERC20Tests from "./ERC20Tests";

// allows debugging in Jetbrains
const debugging = (process.env.JB_IDE_HOST !== undefined);

export async function logEvents (tx: ContractTransaction) {
    const receipt = await tx.wait();

    if (receipt.events) {
        for (const event of receipt.events) {
            debuglog(`Event ${event.event} with args ${event.args}`);
        }
    }
}

describe.only("G7DAO Diamond DApp Testing", async function () {
    let G7DAODiamond: G7DAODiamond;
    let networkDeployedInfo: INetworkDeployInfo;

    if (debugging) {
        debug.enable("G7DAO.*:log");
        debuglog.enabled = true;
        debuglog.log = console.log.bind(console);
        debuglog("Disabling timeout, enabling debuglog, because code was run in Jet Brains (probably debugging)");
        this.timeout(0);
    }

    before(async function () {
        await LoadFacetDeployments();

        const deployer = (await ethers.getSigners())[0].address;

        const networkName = hre.network.name;
        if (!deployments[networkName]) {
            deployments[networkName] = {
                DiamondAddress: "",
                DeployerAddress: deployer,
                FacetDeployedInfo: {}
            };
        }
        networkDeployedInfo = deployments[networkName];

        await deployG7DAODiamond(networkDeployedInfo);

        G7DAODiamond = dc.G7DAODiamond as G7DAODiamond;

        debuglog('Diamond Deployed')

        const IERC165UpgradeableInterface = IERC165Upgradeable__factory.createInterface();
        const IERC165InterfaceID = getInterfaceID(IERC165UpgradeableInterface)
        assert(await G7DAODiamond.supportsInterface(IERC165InterfaceID._hex), "Doesn't support IERC165Interface");

        // do deployment of facets in 3 steps
        await deployDiamondFacets(networkDeployedInfo);
        debuglog(`${util.inspect(networkDeployedInfo, { depth: null })}`);
        await deployFuncSelectors(networkDeployedInfo);
        debuglog(`${util.inspect(networkDeployedInfo, { depth: null })}`);

        // this should be a null operation.
        await deployFuncSelectors(networkDeployedInfo);

        await afterDeployCallbacks(networkDeployedInfo);
        debuglog(`${util.inspect(networkDeployedInfo, { depth: null })}`);

        debuglog('Facets Deployed');
    });

    describe("Facet Cut Testing", async function () {
        let tx;
        let receipt;
        let result;
        const addresses: any[] = [];

        it("should have same count of facets -- call to facetAddresses function", async () => {
            const facetAddresses = await G7DAODiamond.facetAddresses();
            for (const facetAddress of facetAddresses) {
                addresses.push(facetAddress);
            }

            // DiamondCutFacet is deployed but doesn't have any facets deployed
            assert.equal(addresses.length, Object.keys(networkDeployedInfo.FacetDeployedInfo).length);
        });

       it("facets should have the right function selectors -- call to facetFunctionSelectors function", async () => {
            let selectors = getSelectors(dc.DiamondCutFacet);
            result = await G7DAODiamond.facetFunctionSelectors(addresses[0]);
            assert.sameMembers(result, selectors.values, `DiamondCutFacet returned wrong count of selectors: ${result}`);
            selectors = getSelectors(dc.DiamondLoupeFacet);
            result = await G7DAODiamond.facetFunctionSelectors(addresses[1]);
            assert.sameMembers(result, selectors.values, `DiamondLoupeFacet returned wrong count of selectors: ${result}`);
            selectors = getSelectors(dc.OwnershipFacet);
            result = await G7DAODiamond.facetFunctionSelectors(addresses[2]);
            assert.sameMembers(result, selectors.values, `OwnershipFacet returned wrong count of selectors: ${result}`);
        });
    });

    describe("Polygon to ERC20 Deposits", async function () {

        it("Testing if ERC20 token has any supply yet", async () => {
            const [owner, addr1, addr2] = await ethers.getSigners();

            const g7daoSupply = await G7DAODiamond.totalSupply();
            assert(g7daoSupply.eq(0), `ERC Supply should equal zero but equals ${g7daoSupply}`);

            let tx = await G7DAODiamond["deposit(address,uint256)"](owner.address, toWei(2000));
            logEvents(tx);

            const addr1_G7DAODiamond = G7DAODiamond.connect(addr1);
            await expect(addr1_G7DAODiamond["deposit(address,uint256)"](addr1.address, toBN(20))).to.eventually.be.rejectedWith(Error,
                /reverted with reason string 'AccessControl: account/);

            let proxyRole = (await G7DAODiamond.PROXY_ROLE());
            debuglog(`Owner: ${owner.address} Trying to grant PROXY ROLE ${proxyRole} to addr1: ${addr1.address}`);
            await G7DAODiamond.grantRole(proxyRole, addr1.address);

            tx = await addr1_G7DAODiamond["deposit(address,uint256)"](addr1.address, toWei(2000));
            logEvents(tx);
        });

        it("Testing if ERC20 token received deposit", async () => {
            const g7daoSupply = await G7DAODiamond.totalSupply();
            assert(g7daoSupply.eq(toWei(4000)), `G7DAO Supply should be 4000.0, but is ${ethers.utils.formatEther(g7daoSupply)}`);
        });

        after(() => {
            ERC20Tests.suite();
        });
    });
});
