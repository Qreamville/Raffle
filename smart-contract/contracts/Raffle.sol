// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract SimpleStorage {
    uint256 favoriteNumber;

    function store(uint256 _favouriteNumber) public {
        favoriteNumber = _favouriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
