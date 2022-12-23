// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@gnus.ai/contracts-upgradeable-diamond/token/ERC20/ERC20Upgradeable.sol";
import "@gnus.ai/contracts-upgradeable-diamond/token/ERC20/ERC20Storage.sol";
import "../utils/G7DAOAccessControl.sol";

/// @custom:security-contact support@gnus.ai
contract PolygonBridge is G7DAOAccessControl, ERC20Upgradeable
{
    using ERC20Storage for ERC20Storage.Layout;
    bytes32 constant public PROXY_ROLE = keccak256("PROXY_ROLE");

    // no initialization function as it is already done by ERC20
    function PolygonBridge_Initialize() public EIP2535Initializer onlySuperAdminRole {
        __G7DAOAccessControl_init();
        PolygonBridge_Initialize_V1_0();
        _grantRole(PROXY_ROLE, _msgSender());
    }

    // sample on how to upgrade a facet contract with a secondary initializer
    function PolygonBridge_Initialize_V1_0() public onlySuperAdminRole {
        LibDiamond.diamondStorage().supportedInterfaces[type(IERC20Upgradeable).interfaceId] = true;
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControlEnumerableUpgradeable)
    returns (bool) {
        return (AccessControlEnumerableUpgradeable.supportsInterface(interfaceId) ||
            (LibDiamond.diamondStorage().supportedInterfaces[interfaceId] == true));
    }

    // The following functions are for the Ethereum -> Polygon Bridge for ERC-20 Tokens
    // Deposit ERC20 Tokens
    function deposit(address user, uint256 amount) external onlyRole(PROXY_ROLE) {

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        // these are in Wei from the ERC20 contract.
        _mint(user, amount);

        // emit ERC20 Transfer notification
        emit Transfer(address(0), user, amount);
    }

    // withdraw ERC 20 tokens (G7DAO Tokens)
    function withdraw(uint256 amount) public {

        address sender = _msgSender();

        _burn(sender, amount);

        // emit ERC20 Transfer notification
        emit Transfer(sender, address(0), amount);

    }
}

