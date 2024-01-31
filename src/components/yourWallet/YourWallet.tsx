// as token and supportedTokens is gonna come from main, we need to import main
import { Token } from "../Main"
import React, { useState } from "react"
import { Box, makeStyles } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { Tab } from "@material-ui/core"
import { WalletBalance } from "./WalletBalance"
import { StakeForm } from "./StakeForm"

interface YourWalletProps {
    supportedTokens: Array<Token>
    //supportedTokens is gonna be an array of Tokens
}

// define what yourWalletProps is gonna look like
const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4),
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px",
    },
    header: {
        color: "white",
    },
}))

// export YoutWallet.tsx, make it a function,
// pass as parameter supportedTokens of type yourWalletProps
export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)
    //StateHook for selectedtokenindex
    // default state number 0
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        // set the state hook. parse the newvalue integer.
        setSelectedTokenIndex(parseInt(newValue))
    }
    const classes = useStyles()
    return (
        <Box>
            <h1 className={classes.header}> Your Stacking information: </h1>
            <Box className={classes.box}>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="Stake form tabs">
                        {supportedTokens.map((token, index) => {
                            return <Tab label={token.name} value={index.toString()} key={index} />
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                                    <StakeForm token={supportedTokens[selectedTokenIndex]} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
        </Box>
    )
}
