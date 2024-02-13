import { makeStyles, styled } from "@mui/styles"
import Box from "@mui/material/Box"
import { Theme } from "@mui/material/styles"

//#############
// 元
//#############
// const useStyles = makeStyles((theme: Theme) => ({
//     container: {
//         display: "inline-grid",
//         gridTemplateColumns: "auto auto auto",
//         gap: theme.spacing(1),
//         alignItems: "center",
//     },
//     tokenImg: {
//         width: "32px",
//     },
//     amount: {
//         fontWeight: 700,
//     },
// }))

//#############
// Styled
//#############
// const Container = styled(Box)(({ theme }) => ({
//     display: "inline-grid",
//     gridTemplateColumns: "auto auto auto",
//     // gap: theme.spacing(1),
//     alignItems: "center",
// }))

// const TokenImage = styled("img")({
//     width: "32px",
// })

// const Amount = styled("div")(({ theme }) => ({
//     fontWeight: 700,
// }))

interface BalanceMsgProps {
    label: string
    amount: number
    tokenImgSrc: string
}

export const BalanceMsg = ({ label, amount, tokenImgSrc }: BalanceMsgProps) => {
    // const classes = useStyles()

    return (
        //#############
        // 元
        //#############
        // <div className={classes.container}>
        //     <div>{label}</div>
        //     <div className={classes.amount}>{amount}</div>
        //     <img className={classes.tokenImg} src={tokenImgSrc} alt="token logo" />
        // </div>

        //#############
        // Styled
        //#############
        // <Container>
        //     <div>{label}</div>
        //     <Amount>{amount}</Amount>
        //     <TokenImage src={tokenImgSrc} alt="token logo" />
        // </Container>

        //#############
        // SX
        //#############
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
