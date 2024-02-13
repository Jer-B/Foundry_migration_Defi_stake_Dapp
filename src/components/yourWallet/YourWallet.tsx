// as token and supportedTokens is gonna come from main, we need to import main
import { Token } from "../Main"
import React, { useState } from "react"
import { Box, Tab, styled } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { WalletBalance } from "./WalletBalance"
import { StakeForm } from "./StakeForm"

interface YourWalletProps {
    supportedTokens: Array<Token>
    //supportedTokens is gonna be an array of Tokens
}

// define what yourWalletProps is gonna look like
// const useStyles = makeStyles((theme: Theme) => ({
//     tabContent: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: theme.spacing(4),
//     },
//     box: {
//         backgroundColor: "white",
//         borderRadius: "25px",
//     },
//     header: {
//         color: "white",
//     },
// }))

// const StyledBox = styled(Box)({
//     backgroundColor: "white",
//     borderRadius: "25px",
// })

// const StyledTabContent = styled("div")(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: theme.spacing(4),
// }))

// const StyledHeader = styled("h1")(({ theme }) => ({
//     color: "white",
//     textAlign: "center",
//     padding: theme.spacing(4),
// }))

// export YoutWallet.tsx, make it a function,
// pass as parameter supportedTokens of type yourWalletProps
export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)
    //StateHook for selectedtokenindex

    const [refreshBalance, setRefreshBalance] = useState(false)

    // default state number 0
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        // set the state hook. parse the newvalue integer.
        setSelectedTokenIndex(parseInt(newValue))
    }
    // const classes = useStyles()

    const handleRefreshBalance = () => {
        setRefreshBalance((prev) => !prev)
    }
    return (
        //#############
        // 元
        //#############
        // <Box>
        //     <h1 className={classes.header}> Your Stacking information: </h1>
        //     <Box className={classes.box}>
        //         <TabContext value={selectedTokenIndex.toString()}>
        //             <TabList onChange={handleChange} aria-label="Stake form tabs">
        //                 {supportedTokens.map((token, index) => {
        //                     return <Tab label={token.name} value={index.toString()} key={index} />
        //                 })}
        //             </TabList>
        //             {supportedTokens.map((token, index) => {
        //                 return (
        //                     <TabPanel value={index.toString()} key={index}>
        //                         <div className={classes.tabContent}>
        //                             <WalletBalance token={supportedTokens[selectedTokenIndex]} />
        //                             <StakeForm token={supportedTokens[selectedTokenIndex]} />
        //                         </div>
        //                     </TabPanel>
        //                 )
        //             })}
        //         </TabContext>
        //     </Box>
        // </Box>

        //#############
        // Styled
        //#############
        // <StyledBox>
        //     <StyledHeader>Your Stacking information:</StyledHeader>
        //     <StyledBox>
        //         <TabContext value={selectedTokenIndex.toString()}>
        //             <TabList onChange={handleChange} aria-label="Stake form tabs">
        //                 {supportedTokens.map((token, index) => (
        //                     <Tab label={token.name} value={index.toString()} key={index} />
        //                 ))}
        //             </TabList>
        //             {supportedTokens.map((token, index) => (
        //                 <TabPanel value={index.toString()} key={index}>
        //                     <StyledTabContent>
        //                         <WalletBalance token={supportedTokens[selectedTokenIndex]} />
        //                         <StakeForm token={supportedTokens[selectedTokenIndex]} />
        //                     </StyledTabContent>
        //                 </TabPanel>
        //             ))}
        //         </TabContext>
        //     </StyledBox>
        // </StyledBox>

        //#############
        // SX
        //#############
        <Box sx={{ "& > h1": { color: "white", textAlign: "center", padding: 4 } }}>
            <h1>Your Stacking information:</h1>
            <Box sx={{ backgroundColor: "white", borderRadius: "25px" }}>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="Stake form tabs">
                        {supportedTokens.map((token, index) => (
                            <Tab label={token.name} value={index.toString()} key={index} />
                        ))}
                    </TabList>
                    {supportedTokens.map((token, index) => (
                        <TabPanel value={index.toString()} key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                <WalletBalance
                                    token={supportedTokens[selectedTokenIndex]}
                                    refreshFlag={refreshBalance}
                                />
                                <StakeForm
                                    token={supportedTokens[selectedTokenIndex]}
                                    onStakeSuccess={handleRefreshBalance}
                                />
                            </Box>
                        </TabPanel>
                    ))}
                </TabContext>
            </Box>
        </Box>
    )
}
