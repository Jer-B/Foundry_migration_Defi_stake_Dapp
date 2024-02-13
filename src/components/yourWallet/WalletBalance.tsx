//import token from main
import React, { useEffect, useState } from "react"
import { Token } from "../Main"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components/BalanceMsg"
import { useAccount, useReadContract } from "wagmi"
import TokenFarm from "../../chain-info/contracts/TokenFarm.json"
import networkMapping from "../../chain-info/deployments/map.json"
import { BigNumberish, ethers } from "ethers"

/**
 * Interface defining the props for WalletBalance component.
 * @typedef {Object} WalletBalanceProps
 * @property {Token} token - The token object to display the balance of.
 * @property {boolean} refreshFlag - A flag to trigger balance refresh.
 */
export interface WalletBalanceProps {
    token: Token
    refreshFlag: boolean
}

/**
 * Displays the balance of a specified token for the user.
 * @param {WalletBalanceProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The WalletBalance component.
 */
export const WalletBalance = ({ token, refreshFlag }: WalletBalanceProps) => {
    //grab tokens infos
    const { image, name } = token

    //grab wallet account and chainId
    const { chain, address: accountAddress } = useAccount()
    const tokenFarmAddress = chain?.id
        ? networkMapping[chain?.id.toString()]["TokenFarm"][0]
        : ethers.constants.AddressZero

    // Using wagmi hook to read the staking balance from the TokenFarm contract
    const tokenBalanceW = useReadContract({
        abi: TokenFarm.abi,
        address: tokenFarmAddress as `0x${string}`,
        functionName: "stakingBalance",
        args: [token.address, accountAddress],
        account: accountAddress, //msg.sender
    })

    // State to store the formatted token balance
    const [formattedTokenBalance, setFormattedTokenBalance] = useState<number>(0)

    // console.log("Staked Token address is", token.address)
    // console.log("Staked Token balance is", tokenBalanceW.data)

    // Effect hook to update the formatted token balance when the raw balance changes, if no balance, it shows 0
    useEffect(() => {
        if (tokenBalanceW.data) {
            setFormattedTokenBalance(
                parseFloat(formatUnits(tokenBalanceW.data as BigNumberish, 18))
            )
        }
    }, [tokenBalanceW.data])

    useEffect(() => {
        if (tokenBalanceW.data) {
            setFormattedTokenBalance(
                parseFloat(formatUnits(tokenBalanceW.data as BigNumberish, 18))
            )
        }
    }, [refreshFlag])

    // Render the balance message with the formatted balance
    return (
        <BalanceMsg
            label={`Your unstake ${name} balance.`}
            tokenImgSrc={image}
            amount={formattedTokenBalance}
        />
    )
}
