// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

/* Errors */
error Raffle__UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 numPlayers,
    uint256 raffleState
);
error Raffle__NotEnoughEthEntered();
error Raffle__TransferFailed();
error Raffle__SendMoreToEnterRaffle();
error Raffle__RaffleNotOpen();

contract Raffle {
    /* State Variables */
    uint256 private immutable entranceFee;
    address payable[] private players;

    /* Events */
    event RequestedRaffleWinner(uint256 indexed requestId);
    event RaffleEnter(address indexed player);
    event WinnerPicked(address indexed player);

    /* Constructor */
    constructor(uint256 _entranceFee) {
        entranceFee = _entranceFee;
    }

    /* Functions */
    function enterRaffle() public payable {
        if (msg.value < entranceFee) {
            revert Raffle__NotEnoughEthEntered();
        }
        players.push(payable(msg.sender));
    }

    function pickRandom() external {}

    // View & Pure Functions
    function getNumberOfPlayers() public view returns (uint256) {
        return players.length;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return players[index];
    }

    function getEntranceFee() public view returns (uint256) {
        return entranceFee;
    }

    // function getRaffleState() public view returns (RaffleState) {
    //     return raffleState;
    // }

    // function getNumWords() public pure returns (uint256) {
    //     return NUM_WORDS;
    // }

    // function getRequestConfirmations() public pure returns (uint256) {
    //     return REQUEST_CONFIRMATIONS;
    // }

    // function getRecentWinner() public view returns (address) {
    //     return recentWinner;
    // }

    // function getLastTimeStamp() public view returns (uint256) {
    //     return lastTimeStamp;
    // }

    // function getInterval() public view returns (uint256) {
    //     return interval;
    // }
}
