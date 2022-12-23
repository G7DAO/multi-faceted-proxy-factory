// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@gnus.ai/contracts-upgradeable-diamond/token/ERC20/ERC20Upgradeable.sol";
import "@gnus.ai/contracts-upgradeable-diamond/token/ERC20/ERC20Storage.sol";
import "../utils/G7DAOAccessControl.sol";

/// Simple ERC20 contract with no extensions
/// @custom:security-contact support@game7.io
contract G7DAOERC20 is G7DAOAccessControl, ERC20Upgradeable {
    using ERC20Storage for ERC20Storage.Layout;

    // no initialization function as it is already done by ERC20
    function G7DAOERC20_Initialize() public EIP2535Initializer onlySuperAdminRole {
        __G7DAOAccessControl_init();
        __ERC20_init("G7 DAO Tokens", "G7DAO");
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControlEnumerableUpgradeable)
    returns (bool) {
        return (AccessControlEnumerableUpgradeable.supportsInterface(interfaceId) ||
         (LibDiamond.diamondStorage().supportedInterfaces[interfaceId] == true));
    }

}
