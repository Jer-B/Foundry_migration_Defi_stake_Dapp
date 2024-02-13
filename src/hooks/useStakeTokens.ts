// import { useState, useEffect } from "react"
// import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from "wagmi"
// import { ethers } from "ethers"
// import TokenFarm from "../chain-info/contracts/TokenFarm.json"
// import ERC20 from "../chain-info/contracts/MockERC20.json"
// import networkMapping from "../chain-info/deployments/map.json"
// import { useCallback } from "react"
// import DappTokenAbi from "../chain-info/contracts/DappToken.json"

// export interface StakeState {
//     approve: {
//         isPending: boolean
//         isSuccess: boolean
//         // Add any other properties you need to track for the approval process
//     }
//     stake: {
//         isPending: boolean
//         isSuccess: boolean
//         // Add any other properties you need to track for the staking process
//     }
// }

// export const useStakeTokens = (tokenAddress: string) => {
//     const { chain, address: accountAddress } = useAccount()
//     const tokenFarmAddress = chain?.id
//         ? networkMapping[chain?.id.toString()]["TokenFarm"][0]
//         : ethers.constants.AddressZero

//     console.log("tokenFarmAddress", tokenFarmAddress)
//     console.log("chainId", chain?.id)
//     console.log("User address:", accountAddress)
//     console.log("Token address:", tokenAddress)
//     console.log("test", tokenFarmAddress)

//     // Hooks for writing to contracts
//     const { data: approveHash, writeContract: approveErc20 } = useWriteContract()
//     const { data: stakeHash, writeContract: stakeTokens } = useWriteContract()

//     // //Hooks test read contract
//     // const DappTokens = {
//     //     address: "0x62B83262CE7369e8Eb9eF474BE9Ae2d307E27Eae",
//     //     abi: DappTokenAbi.abi,
//     // } as const

//     const result = useReadContract({
//         abi: DappTokenAbi.abi,
//         address: "0x62B83262CE7369e8Eb9eF474BE9Ae2d307E27Eae",
//         functionName: "balanceOf",
//         args: [accountAddress],
//         account: accountAddress, //msg.sender
//     })
//     console.log("data balance of", result.data)

//     const farmowner = useReadContract({
//         abi: TokenFarm.abi,
//         address: "0x6823f47e1F6618Ce00fB51382A63399f89deb0bF",
//         functionName: "stakers",
//         args: [0],
//         account: accountAddress, //msg.sender
//     })
//     console.log("data balance of", farmowner)

//     // Hooks for waiting for transaction receipts
//     const approveReceipt = useWaitForTransactionReceipt({ hash: approveHash })
//     const stakeReceipt = useWaitForTransactionReceipt({ hash: stakeHash })

//     // State to track the overall status of the staking process
//     const [state, setState] = useState<StakeState>({
//         approve: { isPending: false, isSuccess: false },
//         stake: { isPending: false, isSuccess: false },
//     })

//     // State to store the amount to stake
//     const [amountToStake, setAmountToStake] = useState<string>("")

//     // Function to approve tokens
//     const approve = (amount: string) => {
//         // Convert the amount to Wei
//         const amountAsWei = ethers.utils.parseEther(amount)

//         // Store the amount to stake
//         setAmountToStake(amount)

//         // Approve the amount
//         approveErc20({
//             address: tokenAddress as `0x${string}`,
//             abi: ERC20.abi,
//             functionName: "approve",
//             args: [tokenFarmAddress, amountAsWei],
//         })
//         stakeTokens({
//             address: tokenFarmAddress as `0x${string}`,
//             abi: TokenFarm.abi,
//             functionName: "stakeTokens",
//             args: [amountAsWei, tokenAddress as `0x${string}`],
//         })
//     }

//     // Function to stake tokens
//     const stake = useCallback(
//         (amount: string) => {
//             // Convert the amount to Wei
//             const amountAsWei = ethers.utils.parseEther(amount)
//             console.log("stakeTokens function called with:", {
//                 tokenFarmAddress,
//                 TokenFarm,
//                 amount,
//             }) // Add logging here
//             // Stake the tokens
//             stakeTokens({
//                 address: tokenFarmAddress as `0x${string}`,
//                 abi: TokenFarm.abi,
//                 functionName: "stakeTokens",
//                 args: [amountAsWei, tokenAddress as `0x${string}`],
//             })
//         },
//         [stakeTokens, tokenFarmAddress]
//     )

//     const [isApproved, setIsApproved] = useState(false)

//     useEffect(() => {
//         if (approveReceipt.isSuccess) {
//             console.log("Approval successful, updating isApproved state") // Add logging here
//             setState((prevState) => ({
//                 ...prevState,
//                 approve: { ...prevState.approve, isPending: false, isSuccess: true },
//             }))
//             setIsApproved(true)
//         }
//         if (stakeReceipt.isSuccess) {
//             setState((prevState) => ({
//                 ...prevState,
//                 stake: { ...prevState.stake, isPending: false, isSuccess: true },
//             }))
//         }
//     }, [approveReceipt, stakeReceipt])

//     useEffect(() => {
//         if (isApproved) {
//             console.log("Calling stake function with amount:", amountToStake) // Add logging here
//             stake(amountToStake)
//         }
//     }, [isApproved, stake, amountToStake])

//     return { approve, stake, state }
// }

import { useState, useEffect } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from "wagmi"
import { ethers } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"
import { useCallback } from "react"
import DappTokenAbi from "../chain-info/contracts/DappToken.json"

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

export const useStakeTokens = (tokenAddress: string) => {
    const { chain, address: accountAddress } = useAccount()
    const tokenFarmAddress = chain?.id
        ? networkMapping[chain?.id.toString()]["TokenFarm"][0]
        : ethers.constants.AddressZero

    const { data: approveHash, writeContract: approveErc20 } = useWriteContract()
    const { data: stakeHash, writeContract: stakeTokens } = useWriteContract()

    const [state, setState] = useState<StakeState>({
        approve: { isPending: false, isSuccess: false },
        stake: { isPending: false, isSuccess: false },
    })

    const [amountToStake, setAmountToStake] = useState<string>("")

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

    // // Use useEffect to wait for the approval transaction receipt
    // useEffect(() => {
    //     if (approveHash && state.approve.isSuccess) {
    //         // Check if the transaction has been mined
    //         const checkApproval = async () => {
    //             const provider = new ethers.providers.Web3Provider(window.ethereum)
    //             const txReceipt = await provider.getTransactionReceipt(approveHash)
    //             if (txReceipt) {
    //                 console.log("Approval transaction mined")
    //                 setState((prevState) => ({
    //                     ...prevState,
    //                     approve: { ...prevState.approve, isPending: false, isSuccess: true },
    //                 }))
    //                 stake(amountToStake) // Call stake after approval is successful
    //             }
    //         }
    //         checkApproval()
    //     }
    // }, [approveHash, stake, amountToStake])

    // // Use another useEffect to wait for the staking transaction receipt
    // useEffect(() => {
    //     if (stakeHash && state.approve.isSuccess) {
    //         // Check if the transaction has been mined
    //         const checkStake = async () => {
    //             const provider = new ethers.providers.Web3Provider(window.ethereum)
    //             const txReceipt = await provider.getTransactionReceipt(stakeHash)
    //             if (txReceipt) {
    //                 setState((prevState) => ({
    //                     ...prevState,
    //                     stake: { ...prevState.stake, isPending: false, isSuccess: true },
    //                 }))
    //             }
    //         }
    //         checkStake()
    //     }
    // }, [stakeHash])
    // Use useEffect to wait for the approval transaction receipt

    // Call useWaitForTransactionReceipt unconditionally at the top level
    // Call useWaitForTransactionReceipt unconditionally at the top level
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
