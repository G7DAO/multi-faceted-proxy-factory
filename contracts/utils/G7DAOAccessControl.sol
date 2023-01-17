
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./EIP2535Initializable.sol";
import "@gnus.ai/contracts-upgradeable-diamond/contracts/access/AccessControlEnumerableUpgradeable.sol";
import "../libraries/LibDiamond.sol";

abstract contract G7DAOAccessControl is EIP2535Initializable, AccessControlEnumerableUpgradeable  {

    bytes32 constant public UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    function __G7DAOAccessControl_init() internal onlyInitializing onlySuperAdminRole {
        __AccessControlEnumerable_init_unchained();
        __G7DAOAccessControl_init_unchained();
    }

    function __G7DAOAccessControl_init_unchained() onlyInitializing internal {
        address superAdmin = _msgSender();
        _grantRole(DEFAULT_ADMIN_ROLE, superAdmin);
        _grantRole(UPGRADER_ROLE, superAdmin);
    }

    function renounceRole(bytes32 role, address account) public override(IAccessControlUpgradeable) {
        require(!(hasRole(DEFAULT_ADMIN_ROLE, account) && (LibDiamond.diamondStorage().contractOwner == account)), "Cannot renounce superAdmin from Admin Role");
        super.renounceRole(role, account);
    }

    function revokeRole(bytes32 role, address account) public override(IAccessControlUpgradeable) {
        require(!(hasRole(DEFAULT_ADMIN_ROLE, account) && (LibDiamond.diamondStorage().contractOwner == account)), "Cannot revoke superAdmin from Admin Role");
        super.revokeRole(role, account);
    }

    modifier onlySuperAdminRole {
        require(LibDiamond.diamondStorage().contractOwner == msg.sender, "Only SuperAdmin allowed");
        _;
    }


}
