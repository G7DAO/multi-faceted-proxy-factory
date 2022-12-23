import { FacetToDeployInfo } from "./common";
import { glob } from "glob";

export const Facets: FacetToDeployInfo = {
  DiamondCutFacet: { priority: 10 },
  DiamondLoupeFacet: { priority: 20 },
  OwnershipFacet: { priority: 30 },
  G7DAOERC20: { priority: 40, versions: { 0.0: { init: "G7DAOERC20_Initialize" } } },
  PolygonBridge: { priority: 50, versions: { 0.0: { init: "PolyG7DAOBridge_Initialize" } } }
};

export async function LoadFacetDeployments () {
  const imports = glob.sync(`${__dirname}/facetdeployments/*.ts`);
  for (const file of imports) {
    const deployLoad = file.replace(__dirname, ".").replace(".ts", "");
    await import(deployLoad);
  }
};
