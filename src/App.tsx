import React from "react"
import { ChainId, DAppProvider } from "@usedapp/core"
import { Header } from "./components/Header"
import { Container } from "@mui/material"
import { Main } from "./components/Main"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"

// Configure chains and providers
/* New RainbowKit API */
const config = getDefaultConfig({
    appName: "Taken Farm Dapp",
    projectId: "365f263d0a2fa202eb5a3d18393769af",
    chains: [sepolia],
})

const queryClient = new QueryClient()

function App() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {/* <DAppProvider
                        config={{
                            supportedChains: [ChainId.Sepolia],
                            notifications: {
                                expirationPeriod: 1000,
                                checkInterval: 1000,
                            },
                        }}
                    > */}
                    <Header />
                    <Container maxWidth="md">
                        <Main />
                    </Container>
                    {/* </DAppProvider> */}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default App
