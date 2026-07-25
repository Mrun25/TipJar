// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title TipJar
/// @notice A transparent, permissionless tip jar. Readers send ETH with an
///         optional message; every tip is recorded on-chain via an event.
/// @dev    Deploy once; the deployer becomes the immutable owner who can withdraw.
contract TipJar {
    // ─── State ────────────────────────────────────────────────────────────────

    address public immutable owner;
    uint256 public totalTips;
    uint256 public totalAmount;

    uint256 public constant MAX_MESSAGE_LENGTH = 280;

    // ─── Events ───────────────────────────────────────────────────────────────

    /// @notice Emitted for every successful tip.
    /// @param  sender    The tipper's address.
    /// @param  amount    Value sent in wei.
    /// @param  message   Optional UTF-8 message (≤ 280 chars).
    /// @param  timestamp Block timestamp at the moment of the tip.
    event NewTip(
        address indexed sender,
        uint256 amount,
        string  message,
        uint256 timestamp
    );

    // ─── Errors ───────────────────────────────────────────────────────────────

    error NotOwner();
    error ZeroTip();
    error MessageTooLong(uint256 length, uint256 max);
    error WithdrawFailed();

    // ─── Constructor ──────────────────────────────────────────────────────────

    constructor() {
        owner = msg.sender;
    }

    // ─── External functions ───────────────────────────────────────────────────

    /// @notice Send a tip with an optional note.
    /// @param  message  A short supporter message, max 280 characters.
    function tip(string calldata message) external payable {
        if (msg.value == 0) revert ZeroTip();

        uint256 msgLen = bytes(message).length;
        if (msgLen > MAX_MESSAGE_LENGTH) {
            revert MessageTooLong(msgLen, MAX_MESSAGE_LENGTH);
        }

        totalTips   += 1;
        totalAmount += msg.value;

        emit NewTip(msg.sender, msg.value, message, block.timestamp);
    }

    /// @notice Withdraw all ETH to the owner. Only callable by the owner.
    function withdraw() external {
        if (msg.sender != owner) revert NotOwner();

        uint256 balance = address(this).balance;
        (bool ok, ) = owner.call{value: balance}("");
        if (!ok) revert WithdrawFailed();
    }

    /// @notice Contract balance in wei.
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // ─── Fallback ─────────────────────────────────────────────────────────────

    /// @dev Plain ETH transfers without calldata are rejected; use tip().
    receive() external payable {
        revert("Use tip()");
    }
}
