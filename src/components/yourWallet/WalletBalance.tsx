//import token from main
import React, { useEffect, useState } from "react"
import { Token } from "../Main"
import { useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components/BalanceMsg"
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from "wagmi"
import TokenFarm from "../../chain-info/contracts/TokenFarm.json"
import networkMapping from "../../chain-info/deployments/map.json"
import { BigNumber, BigNumberish, ethers } from "ethers"
import { getBalance } from "@wagmi/core"
import { sepolia } from "@wagmi/core/chains"
import { http, createConfig } from "@wagmi/core"

//export walletbalanceprops interface
export interface WalletBalanceProps {
    token: Token
    refreshFlag: boolean
}

//export the function to show the balance of the selected token
export const WalletBalance = ({ token, refreshFlag }: WalletBalanceProps) => {
    //grab tokens infos
    const { image, address, name } = token
    //grab wallet account
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)

    const { chain, address: accountAddress } = useAccount()

    const tokenFarmAddress = chain?.id
        ? networkMapping[chain?.id.toString()]["TokenFarm"][0]
        : ethers.constants.AddressZero

    const tokenBalanceW = useReadContract({
        abi: TokenFarm.abi,
        address: tokenFarmAddress as `0x${string}`,
        functionName: "stakingBalance",
        args: [token.address, accountAddress],
        account: accountAddress, //msg.sender
    })
    const [formattedTokenBalance, setFormattedTokenBalance] = useState<number>(0)

    console.log("Staked Token address is", token.address)
    console.log("Staked Token balance is", tokenBalanceW.data)
    // format the number of tokenbalance, parsed in a float number otherwise it s gonna be 0
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
    return (
        <BalanceMsg
            label={`Your unstake ${name} balance.`}
            tokenImgSrc={image}
            amount={formattedTokenBalance}
        />
    )
}
