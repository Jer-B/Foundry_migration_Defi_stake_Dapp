/**
 * `BalanceMsg` component is designed to display a balance message for a specific token.
 * It shows the token label, the amount of tokens, and the token image. This component is
 * useful for displaying balance information in a clear and visually appealing manner.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.label - The label for the balance message (e.g., "Your Token Balance").
 * @param {number} props.amount - The amount of the token.
 * @param {string} props.tokenImgSrc - The source URL for the token's image.
 * @example
 * return (
 *   <BalanceMsg
 *     label="Your Token Balance"
 *     amount={100}
 *     tokenImgSrc="/path/to/token/image.png"
 *   />
 * )
 */
import Box from "@mui/material/Box"

interface BalanceMsgProps {
    label: string
    amount: number
    tokenImgSrc: string
}

export const BalanceMsg = ({ label, amount, tokenImgSrc }: BalanceMsgProps) => {
    return (
        <Box
            sx={{
                display: "inline-grid",
                gridTemplateColumns: "auto auto auto",
                gap: 1, // Using the theme's spacing scale
                alignItems: "center",
            }}
        >
            <Box>{label}</Box>
            <Box
                sx={{
                    fontWeight: 700,
                }}
            >
                {amount}
            </Box>
            <Box
                component="img"
                sx={{
                    width: "32px",
                }}
                src={tokenImgSrc}
                alt="token logo"
            />
        </Box>
    )
}
