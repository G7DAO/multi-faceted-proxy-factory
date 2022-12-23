import { G7DAODiamond } from "../../typechain-types";
import {
  dc,
  IFacetDeployedInfo,
  debuglog,
  INetworkDeployInfo,
  AfterDeployInit,
  getSighash,
} from "../common";
import { Facets } from "../facets";
import * as hre from "hardhat";

const PolygonProxyAddresses: { [key: string]: string } = {
  mumbai: "0xb5505a6d998549090530911180f38aC5130101c6",
  polygon: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
  hardhat: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa", // for testing
};

const afterDeploy: AfterDeployInit = async (
  networkDeployInfo: INetworkDeployInfo
) => {
  debuglog("In PolygonBridge after Deploy function");

  const G7DAODiamond = dc.G7DAODiamond as G7DAODiamond;
  const proxyRole = await G7DAODiamond.PROXY_ROLE({ gasLimit: 600000 });
  const networkName = hre.network.name;

  // allow Polygon ChildChainManagerProxis
  if (networkName in PolygonProxyAddresses) {
    const proxyAddress: string = PolygonProxyAddresses[networkName];
    try {
      await G7DAODiamond.grantRole(proxyRole, proxyAddress, {
        gasLimit: 600000,
      });
    } catch (e) {
      debuglog(
        `Warning, couldn't grant proxy role for ${networkName} Deposit/Withdrawal contract at ${proxyAddress}`
      );
    }
  }
};

// upgrade to 1.0 with ERC20 contract support, this upgrades all function selectors
Facets.PolygonBridge.versions![1.0] = {
  fromVersion: 0.0,
  init: "PolyBridge_Initialize",
  upgradeInit: "PolygonBridge_Initialize_V1_0",
  callback: afterDeploy
};

// upgrade to 1.0 with ERC20 contract support, this upgrades all function selectors
Facets.PolygonBridge.versions![1.1] = {
  fromVersion: 1.0,
  init: "PolygonBridge_Initialize"
};
