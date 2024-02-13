import { useState, useEffect } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi"
import { ethers } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"

/**
 * Interface for tracking the approval and staking state of a token.
 */
export interface StakeState {
    approve: {
        isPending: boolean
        isSuccess: boolean
    }
    stake: {
        isPending: boolean
        isSuccess: boolean
    }
}

/**
 * Custom hook for approving and staking tokens in the TokenFarm contract.
 *
 * @param {string} tokenAddress The address of the token to be staked.
 * @returns The approval and staking state, along with functions to approve and stake tokens.
 */
export const useStakeTokens = (tokenAddress: string) => {
    // get account and chainId
    const { chain } = useAccount()
    const tokenFarmAddress = chain?.id
        ? networkMapping[chain?.id.toString()]["TokenFarm"][0]
        : ethers.constants.AddressZero

    // Custom hooks to interact with the contracts
    const { data: approveHash, writeContract: approveErc20 } = useWriteContract()
    const { data: stakeHash, writeContract: stakeTokens } = useWriteContract()

    const [state, setState] = useState<StakeState>({
        approve: { isPending: false, isSuccess: false },
        stake: { isPending: false, isSuccess: false },
    })

    const [amountToStake, setAmountToStake] = useState<string>("")

    /**
     * Approves the TokenFarm contract to spend the specified amount of tokens.
     * @param {string} amount The amount of tokens to approve, in token units.
     */
    const approve = async (amount: string) => {
        const amountAsWei = ethers.utils.parseEther(amount)
        setAmountToStake(amount)

        approveErc20({
            address: tokenAddress as `0x${string}`,
            abi: ERC20.abi,
            functionName: "approve",
            args: [tokenFarmAddress, amountAsWei],
        })

        setState((prevState) => ({
            ...prevState,
            approve: { ...prevState.approve, isPending: true, isSuccess: false },
        }))
    }

    /**
     * Stakes the approved amount of tokens in the TokenFarm contract.
     * @param {string} amount The amount of tokens to stake, in token units.
     */
    const stake = async (amount: string) => {
        const amountAsWei = ethers.utils.parseEther(amount)

        stakeTokens({
            address: tokenFarmAddress as `0x${string}`,
            abi: TokenFarm.abi,
            functionName: "stakeTokens",
            args: [amountAsWei, tokenAddress as `0x${string}`],
        })

        setState((prevState) => ({
            ...prevState,
            stake: { ...prevState.stake, isPending: true, isSuccess: false },
        }))
    }

    // React to transaction receipt details
    const approveReceipt = useWaitForTransactionReceipt({ hash: approveHash })
    const stakeReceipt = useWaitForTransactionReceipt({ hash: stakeHash })

    // Use useEffect to handle the receipt data
    useEffect(() => {
        if (approveReceipt.data && !state.approve.isSuccess) {
            console.log("Approval transaction mined") // Log when the approval transaction is mined
            setState((prevState) => ({
                ...prevState,
                approve: { ...prevState.approve, isPending: false, isSuccess: true },
            }))
            stake(amountToStake) // Call stake after approval is successful
        }
    }, [approveReceipt.data, stake, amountToStake, state.approve.isSuccess]) // Dependencies updated to include approveReceipt.data

    useEffect(() => {
        if (stakeReceipt.data && !state.stake.isSuccess) {
            console.log("Staking transaction mined") // Log when the staking transaction is mined
            setState((prevState) => ({
                ...prevState,
                stake: { ...prevState.stake, isPending: false, isSuccess: true },
            }))
        }
    }, [stakeReceipt.data, state.stake.isSuccess]) // Dependencies updated to include stakeReceipt.data

    return { approve, stake, state }
}
