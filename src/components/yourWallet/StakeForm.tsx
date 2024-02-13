import React, { useState, useEffect } from "react"
import { Token } from "../Main"
import { Button, Input, Snackbar } from "@mui/material"
import Alert from "@mui/material/Alert"
import { useStakeTokens } from "../../hooks"

/**
 * Properties expected by the StakeForm component.
 * @typedef {Object} StakeFormProps
 * @property {Token} token - Details of the token to be staked.
 * @property {() => void} onStakeSuccess - Callback function to invoke upon successful staking.
 */

export interface StakeFormProps {
    token: Token
    onStakeSuccess: () => void
}

/**
 * A form component for staking tokens.
 * Allows users to approve and stake tokens into the staking contract.
 *
 * @param {StakeFormProps} props - The properties passed to the component.
 * @returns {React.ReactElement} A form for staking tokens.
 */
export const StakeForm: React.FC<StakeFormProps> = ({ token, onStakeSuccess }) => {
    const { address: tokenAddress } = token
    const [amount, setAmount] = useState<string>("")

    // State to manage the display of the approval success alert.
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false)
    // State to manage the display of the staking success alert.
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false)

    // Custom hook to interact with the staking contract.
    const { approve, stake, state } = useStakeTokens(tokenAddress)

    /**
     * Handles the approval and staking of tokens.
     * Calls the approve function from the useStakeTokens hook with the amount to stake.
     */
    const handleApprove = () => {
        const stakeAmount = amount.trim() === "" ? "0" : amount
        approve(stakeAmount)
    }

    const handleStake = () => {
        const stakeAmount = amount.trim() === "" ? "0" : amount
        stake(stakeAmount)
    }

    // useEffect to show ERC20 approval success message
    useEffect(() => {
        // Trigger the alert for approval success
        if (state.approve.isSuccess) {
            setShowErc20ApprovalSuccess(true)
            // Ensure that the alert is only shown for a limited time
            const timeout = setTimeout(() => setShowErc20ApprovalSuccess(false), 6000)
            return () => clearTimeout(timeout)
        }
    }, [state.approve.isSuccess])

    // useEffect to show staking success message and invoke onStakeSuccess callback
    useEffect(() => {
        // Trigger the alert for staking success
        if (state.stake.isSuccess) {
            setShowStakeTokenSuccess(true)
            // Ensure that the alert is only shown for a limited time
            const timeout = setTimeout(() => setShowStakeTokenSuccess(false), 6000)
            onStakeSuccess()
            return () => clearTimeout(timeout)
        }
    }, [state.stake.isSuccess])

    return (
        <div>
            <Input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Amount to stake"
                type="number"
                inputProps={{ min: "0", step: "any" }}
                style={{ color: "red" }}
            />
            <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={handleApprove}
                style={{ marginLeft: "10px", marginRight: "10px" }}
            >
                Approve & Stake Tokens
            </Button>
            {/* <Button color="primary" variant="contained" size="large" onClick={handleStake}>
                Stake Tokens
            </Button> */}
            <Snackbar open={showErc20ApprovalSuccess} autoHideDuration={6000}>
                <Alert onClose={() => setShowErc20ApprovalSuccess(false)} severity="success">
                    ERC20 Approval Successful
                </Alert>
            </Snackbar>
            <Snackbar open={showStakeTokenSuccess} autoHideDuration={6000}>
                <Alert onClose={() => setShowStakeTokenSuccess(false)} severity="success">
                    Staking Successful
                </Alert>
            </Snackbar>
        </div>
    )
}
