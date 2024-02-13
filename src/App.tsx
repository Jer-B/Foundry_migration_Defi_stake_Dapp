/**
 * The main application component setting up the providers and layout for the Taken Farm Dapp.
 * It wraps the application with necessary providers for blockchain interaction and UI components.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
import React from "react"
import { Header } from "./components/Header"
import { Container } from "@mui/material"
import { Main } from "./components/Main"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { sepolia } from "wagmi/chains"
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
                    <Header />
                    <Container maxWidth="md">
                        <Main />
                    </Container>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default App
