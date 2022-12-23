// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@gnus.ai/contracts-upgradeable-diamond/proxy/utils/InitializableStorage.sol";
import "../libraries/LibDiamond.sol";

abstract contract EIP2535Initializable {

    // override Initializable::initializer modifier
    modifier EIP2535Initializer() {
        InitializableStorage.layout()._initialized = true;
        InitializableStorage.layout()._initializing = true;
        _;
        // multiple facet contracts needed initialization on deployment
        InitializableStorage.layout()._initialized = false;
        InitializableStorage.layout()._initializing = false;
    }

}
