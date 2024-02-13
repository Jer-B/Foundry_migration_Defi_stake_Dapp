/* eslint-disable spaced-comment */
/**
 * `Main` component serves as the central part of the DApp, displaying the token farming interface.
 * It fetches and displays the DApp token, WETH, and DAI tokens based on the connected blockchain network.
 * The component also dynamically adjusts to the current network and updates token addresses accordingly.
 *
 * @component
 * @example
 * return (
 *   <Main />
 * )
 */
/// <reference types="react-scripts" />
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dapp from "../images/dapp.png"
import eth from "../images/eth.png"
import dai from "../images/dai.png"
import { YourWallet } from "./yourWallet"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useAccount } from "wagmi"
export type Token = {
    image: string
    address: string
    name: string
}

export const Main = () => {
    const { chain, address: accountAddress } = useAccount()
    // Show token values from the wallet
    // get the contract addresses of tokens for staking
    // get the wallet balance
    // get the dapp token address

    // map numbers to name from helper-config.json to use the same network name here.
    // but grab chainid from helper-config only if helper-config and the id exist
    const networkName = chain?.id ? helperConfig[chain?.id] : "11155111"

    // console.log("networkName", networkName)
    // console.log("stringChainId", chain?.id)

    // get dapptoken address from map.json
    // if there is a chainId, check it in map.json, then look at a token on that chain id and get its position 0 of the address list
    // else get a zero address from ethers.
    const dappTokenAddress = chain?.id
        ? networkMapping[chain?.id.toString()]["DappToken"][0]
        : constants.AddressZero

    // console.log("dappTokenAddress", dappTokenAddress)

    // grab FAU token and Weth token addresses from brownie config

    const fauTokenAddress = chain?.id
        ? brownieConfig["networks"]["sepolia"]["fau_token"]
        : constants.AddressZero

    // console.log("fauTokenAddress:", fauTokenAddress)

    const wethTokenAddress = chain?.id
        ? brownieConfig["networks"]["sepolia"]["weth_token"]
        : constants.AddressZero
    // console.log("wethTokenAddress", wethTokenAddress)

    // put those 3 addresses into a Token array
    // that is equal to an array of some types
    const supportedTokens: Array<Token> = [
        // first token
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP",
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH",
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI",
        },
    ]

    return (
        <>
            <Box sx={{ textAlign: "center", padding: 4 }}>
                <Typography variant="h2" sx={{ color: "common.white" }}>
                    Token Farming DApp
                </Typography>
            </Box>
            <YourWallet supportedTokens={supportedTokens} />
        </>
    )
}
