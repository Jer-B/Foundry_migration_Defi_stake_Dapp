/**
 * `Header` component provides a user interface for connecting a wallet. It utilizes
 * the `ConnectButton` from the `@rainbow-me/rainbowkit` library to facilitate
 * blockchain wallet connections in a seamless and intuitive manner. The component is styled
 * to position the connect button at the top right corner of the application.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
import { Box } from "@mui/material"
import { ConnectButton } from "@rainbow-me/rainbowkit"

// export a constant variable called header, which is a function doing whats in brackets
export const Header = () => {
    //affect the container to the export

    return (
        <Box
            sx={{
                padding: (theme) => theme.spacing(4),
                display: "flex",
                justifyContent: "flex-end",
                gap: (theme) => theme.spacing(1),
            }}
        >
            <ConnectButton />
        </Box>
    )
}
