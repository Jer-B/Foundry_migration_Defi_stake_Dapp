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
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useAccount } from "wagmi"

export type Token = {
    image: string
    address: string
    name: string
}

//#############
// 元
//#############
// const useStyles = makeStyles((theme: Theme) => ({
//     title: {
//         color: theme.palette.common.white,
//         textAlign: "center",
//         padding: theme.spacing(4),
//     },
// }))

//#############
// Styled
//#############
// const Title = styled(Typography)({
//     textAlign: "center",
//     padding: 4, // Using the spacing multiplier
//     color: "white", // Assuming a dark theme background
// })

export const Main = () => {
    const { chain, address: accountAddress } = useAccount()
    // Show token values from the wallet
    // get the contract addresses of tokens for staking
    // get the wallet balance
    // get the dapp token addresse

    // const classes = useStyles()

    // map numbers to name from helper-config.json to use the same network name here.
    // but grab chainid from helper-config only if helper-config and the id exist
    // const networkName = chainId ? helperConfig[chainId] : "dev";

    // we can do console.log to see returned value of variables
    // console.log(networkName)
    // console.log(chainId)

    // const { chainId, error } = useEthers()
    const networkName = chain?.id ? helperConfig[chain?.id] : "11155111"
    let stringChainId = String(chain?.id)

    console.log("networkName", networkName)
    console.log("stringChainId", chain?.id)

    // get dapptoken address from map.json
    // if there is a chainId, check it in map.json, then look at a token on that chain id and get its position 0 of the address list
    // else get a zero address from ethers.

    // const dappTokenAddress = chainId
    //     ? networkMapping[stringChainId]["DappToken"][0]
    //     : constants.AddressZero

    const dappTokenAddress = chain?.id
        ? networkMapping[chain?.id.toString()]["DappToken"][0]
        : constants.AddressZero

    console.log("dappTokenAddress", dappTokenAddress)

    // grab FAU token and Weth token addresses from brownie config

    const fauTokenAddress = chain?.id
        ? brownieConfig["networks"]["sepolia"]["fau_token"]
        : constants.AddressZero

    console.log("fauTokenAddress:", fauTokenAddress)

    const wethTokenAddress = chain?.id
        ? brownieConfig["networks"]["sepolia"]["weth_token"]
        : constants.AddressZero
    console.log("wethTokenAddress", wethTokenAddress)
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
        //#############
        // 元
        //#############
        // <>
        //     <h2 className={classes.title}>Token Farming DApp</h2>
        //     <YourWallet supportedTokens={supportedTokens} />
        // </>

        //#############
        // Styled
        //#############
        // <>
        //     <Title variant="h2">Token Farming DApp</Title>
        //     <YourWallet supportedTokens={supportedTokens} />
        // </>

        //#############
        // SX
        //#############
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
