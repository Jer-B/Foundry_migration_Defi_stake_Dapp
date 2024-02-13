/**
 * The `YourWallet` component provides an interface for users to interact with their token balances and stake tokens.
 * It displays a tab for each supported token, showing the user's balance of that token and allowing them to stake tokens.
 * The component also supports refreshing the balance display after a successful stake transaction.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<Token>} props.supportedTokens - An array of supported token objects
 */

// as token and supportedTokens comes from main, we need to import main
import { Token } from "../Main"
import React, { useState } from "react"
import { Box, Tab } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { WalletBalance } from "./WalletBalance"
import { StakeForm } from "./StakeForm"

interface YourWalletProps {
    supportedTokens: Array<Token>
    //supportedTokens is an array of Tokens
}

// export YoutWallet.tsx, make it a function,
// pass as parameter supportedTokens of type yourWalletProps
export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    // State for currently selected token index
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

    // State to trigger balance refresh
    const [refreshBalance, setRefreshBalance] = useState(false)

    /**
     * Handles changing the selected token tab.
     * @param {React.ChangeEvent<{}>} event - The event object (unused here).
     * @param {string} newValue - The new selected tab value (token index).
     */
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        // set the state hook. parse the newvalue integer.
        setSelectedTokenIndex(parseInt(newValue))
    }

    /**
     * Toggles the refresh balance state to trigger a refresh of the WalletBalance component.
     */
    const handleRefreshBalance = () => {
        setRefreshBalance((prev) => !prev)
    }
    return (
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
