/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
// import usethers
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
// object mapped to map.json
import networkMapping from "../chain-info/deployments/map.json"
// constants from ethers to get a zero address
import { constants } from "ethers"
// brownie-config file
import brownieConfig from "../brownie-config.json"
//import all 3 images
import dapp from "../images/dapp.png"
import eth from "../images/eth.png"
import dai from "../images/dai.png"
// import YourWallet
import { YourWallet } from "./yourWallet"
import { makeStyles } from "@material-ui/core"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4),
    },
}))

export const Main = () => {
    // Show token values from the wallet
    // get the contract addresses of tokens for staking
    // get the wallet balance
    // get the dapp token addresse
    const classes = useStyles()
    // map numbers to name from helper-config.json to use the same network name here.
    // but grab chainid from helper-config only if helper-config and the id exist
    // const networkName = chainId ? helperConfig[chainId] : "dev";

    // we can do console.log to see returned value of variables
    //console.log(networkName)
    //console.log(chainId)

    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    let stringChainId = String(chainId)
    // get dapptoken address from map.json
    // if there is a chainId, check it in map.json, then look at a token on that chain id and get its position 0 of the address list
    // else get a zero address from ethers.

    const dappTokenAddress = chainId
        ? networkMapping[stringChainId]["DappToken"][0]
        : constants.AddressZero

    // grab FAU token and Weth token addresses from brownie config

    const fauTokenAddress = chainId
        ? brownieConfig["networks"][networkName]["fau_token"]
        : constants.AddressZero

    const wethTokenAddress = chainId
        ? brownieConfig["networks"][networkName]["weth_token"]
        : constants.AddressZero

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
            <h2 className={classes.title}>Token Farming DApp</h2>
            <YourWallet supportedTokens={supportedTokens} />
        </>
    )
}
