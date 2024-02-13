// import React, { useState, useEffect } from "react"
// import { Token } from "../Main"
// import { Button, Input, CircularProgress, Snackbar } from "@mui/material"
// import Alert from "@mui/material/Alert"
// import { useStakeTokens } from "../../hooks"
// import { utils } from "ethers"

// export interface StakeFormProps {
//     token: Token
// }

// export const StakeForm: React.FC<StakeFormProps> = ({ token }) => {
//     const { address: tokenAddress, name } = token
//     const [amount, setAmount] = useState<string>("")
//     const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false)
//     const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false)

//     const { approve, state: approveAndStakeState } = useStakeTokens(tokenAddress)

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newAmount = event.target.value
//         setAmount(newAmount)
//     }

//     const handleStakeSubmit = () => {
//         const amountAsWei = utils.parseEther(amount)
//         console.log("Approving amount:", amountAsWei.toString()) // Add logging here
//         approve(amountAsWei.toString())
//     }

//     const isMining = approveAndStakeState.approve.isPending || approveAndStakeState.stake.isPending

//     useEffect(() => {
//         console.log("approveAndStakeState changed:", approveAndStakeState) // Add logging here
//         if (approveAndStakeState.approve.isSuccess) {
//             setShowErc20ApprovalSuccess(true)
//             setShowStakeTokenSuccess(false)
//         } else if (approveAndStakeState.stake.isSuccess) {
//             setShowErc20ApprovalSuccess(false)
//             setShowStakeTokenSuccess(true)
//         }
//     }, [approveAndStakeState])

//     const handleCloseSnack = () => {
//         setShowErc20ApprovalSuccess(false)
//         setShowStakeTokenSuccess(false)
//     }

//     return (
//         <>
//             <div style={{ display: "flex", alignItems: "center" }}>
//                 <div style={{ marginRight: "8px" }}>Amount:</div>
//                 <Input placeholder="Amount to stake" onChange={handleInputChange} sx={{ mr: 2 }} />
//                 <Button
//                     onClick={handleStakeSubmit}
//                     color="primary"
//                     variant="contained"
//                     size="large"
//                     disabled={isMining}
//                 >
//                     {isMining ? <CircularProgress size={26} /> : "Stake"}
//                 </Button>
//             </div>
//             <Snackbar
//                 open={showErc20ApprovalSuccess}
//                 autoHideDuration={5000}
//                 onClose={handleCloseSnack}
//             >
//                 <Alert onClose={handleCloseSnack} severity="success">
//                     ERC-20 use approved! Waiting confirmation for staking.
//                 </Alert>
//             </Snackbar>
//             <Snackbar
//                 open={showStakeTokenSuccess}
//                 autoHideDuration={5000}
//                 onClose={handleCloseSnack}
//             >
//                 <Alert onClose={handleCloseSnack} severity="success">
//                     Tokens staked with success!
//                 </Alert>
//             </Snackbar>
//         </>
//     )
// }

// import React, { useState, useEffect } from "react"
// import { Token } from "../Main"
// import { Button, Input, CircularProgress, Snackbar } from "@mui/material"
// import Alert from "@mui/material/Alert"
// import { useStakeTokens } from "../../hooks"
// import { utils } from "ethers"

// export interface StakeFormProps {
//     token: Token
// }

// export const StakeForm: React.FC<StakeFormProps> = ({ token }) => {
//     const { address: tokenAddress, name } = token
//     const [amount, setAmount] = useState<string>("")

//     const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false)
//     const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false)

//     const { approve, stake, state } = useStakeTokens(tokenAddress)

//     const handleApprove = () => {
//         approve(amount)
//         setShowErc20ApprovalSuccess(false)
//         setShowStakeTokenSuccess(false)
//     }

//     const handleStake = () => {
//         setShowErc20ApprovalSuccess(false)
//         setShowStakeTokenSuccess(false)
//         stake(amount)
//     }

//     useEffect(() => {
//         if (state.approve.isSuccess) {
//             setShowErc20ApprovalSuccess(true)
//             setTimeout(() => setShowErc20ApprovalSuccess(false), 6000)
//             setShowStakeTokenSuccess(false)
//         } else if (state.stake.isSuccess) {
//             setShowErc20ApprovalSuccess(false)
//             setTimeout(() => setShowErc20ApprovalSuccess(false), 6000)
//             setShowStakeTokenSuccess(true)
//         }
//     }, [state])

//     // const handleApprove = () => {
//     //     const stakeAmount = amount.trim() === "" ? "0" : amount
//     //     approve(stakeAmount)
//     // }

//     // const handleStake = () => {
//     //     const stakeAmount = amount.trim() === "" ? "0" : amount
//     //     stake(stakeAmount)
//     // }

//     // useEffect(() => {
//     //     if (state.approve.isSuccess) {
//     //         setShowErc20ApprovalSuccess(true)
//     //         setShowStakeTokenSuccess(false)
//     //     } else if (state.stake.isSuccess) {
//     //         setShowErc20ApprovalSuccess(false)
//     //         setShowStakeTokenSuccess(true)
//     //     }
//     // }, [state.stake.isSuccess])

//     return (
//         <div>
//             {/* <h2>{name}</h2> */}
//             <Input
//                 value={amount}
//                 onChange={(event) => setAmount(event.target.value)}
//                 placeholder="Amount to stake"
//                 type="number"
//                 inputProps={{ min: "0", step: "any" }}
//                 style={{ color: "red" }}
//             />
//             <Button
//                 color="primary"
//                 variant="contained"
//                 size="large"
//                 onClick={handleApprove}
//                 style={{ marginRight: "10px" }}
//             >
//                 Approve
//             </Button>
//             <Button color="primary" variant="contained" size="large" onClick={handleStake}>
//                 Stake Tokens
//             </Button>
//             <Snackbar open={showErc20ApprovalSuccess} autoHideDuration={6000}>
//                 <Alert onClose={() => setShowErc20ApprovalSuccess(false)} severity="success">
//                     ERC20 Approval Successful
//                 </Alert>
//             </Snackbar>
//             <Snackbar open={showStakeTokenSuccess} autoHideDuration={6000}>
//                 <Alert onClose={() => setShowStakeTokenSuccess(false)} severity="success">
//                     Staking Successful
//                 </Alert>
//             </Snackbar>
//         </div>
//     )
// }

import React, { useState, useEffect } from "react"
import { Token } from "../Main"
import { Button, Input, CircularProgress, Snackbar } from "@mui/material"
import Alert from "@mui/material/Alert"
import { useStakeTokens } from "../../hooks"
import { utils } from "ethers"

export interface StakeFormProps {
    token: Token
    onStakeSuccess: () => void
}

export const StakeForm: React.FC<StakeFormProps> = ({ token, onStakeSuccess }) => {
    const { address: tokenAddress, name } = token
    const [amount, setAmount] = useState<string>("")
    const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] = useState(false)
    const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false)
    const { approve, stake, state } = useStakeTokens(tokenAddress)

    const handleApprove = () => {
        const stakeAmount = amount.trim() === "" ? "0" : amount
        approve(stakeAmount)
    }

    const handleStake = () => {
        const stakeAmount = amount.trim() === "" ? "0" : amount
        stake(stakeAmount)
    }

    // useEffect(() => {
    //     if (state.approve.isSuccess) {
    //         setShowErc20ApprovalSuccess(true)
    //         setTimeout(() => setShowErc20ApprovalSuccess(false), 6000)
    //         setShowStakeTokenSuccess(false)
    //     } else if (state.stake.isSuccess) {
    //         setShowErc20ApprovalSuccess(false)
    //         setTimeout(() => setShowErc20ApprovalSuccess(false), 6000)
    //         setShowStakeTokenSuccess(true)
    //     }
    //     // }, [state])
    // }, [state.approve.isSuccess, state.stake.isSuccess])
    //========
    // useEffect(() => {
    //     if (state.approve.isSuccess) {
    //         setShowErc20ApprovalSuccess(true)
    //         setTimeout(() => setShowErc20ApprovalSuccess(false), 6000)
    //         setShowStakeTokenSuccess(false)
    //     } else if (state.stake.isSuccess) {
    //         setShowErc20ApprovalSuccess(false)
    //         setTimeout(() => setShowStakeTokenSuccess(false), 6000)
    //         setShowStakeTokenSuccess(true)
    //     }
    // }, [state.approve.isSuccess, state.stake.isSuccess])
    //==========
    // const handleApprove = () => {
    //     const stakeAmount = amount.trim() === "" ? "0" : amount
    //     approve(stakeAmount)
    // }

    // const handleStake = () => {
    //     const stakeAmount = amount.trim() === "" ? "0" : amount
    //     stake(stakeAmount)
    // }

    // useEffect(() => {
    //     if (state.approve.isSuccess) {
    //         setShowErc20ApprovalSuccess(true)
    //         setShowStakeTokenSuccess(false)
    //     } else if (state.stake.isSuccess) {
    //         setShowErc20ApprovalSuccess(false)
    //         setShowStakeTokenSuccess(true)
    //     }
    // }, [state.stake.isSuccess])

    useEffect(() => {
        // Trigger the alert for approval success
        if (state.approve.isSuccess) {
            setShowErc20ApprovalSuccess(true)
            // Ensure that the alert is only shown for a limited time
            const timeout = setTimeout(() => setShowErc20ApprovalSuccess(false), 6000)
            return () => clearTimeout(timeout)
        }
    }, [state.approve.isSuccess])

    useEffect(() => {
        // Trigger the alert for staking success
        if (state.stake.isSuccess) {
            setShowStakeTokenSuccess(true)
            // Ensure that the alert is only shown for a limited time
            const timeout = setTimeout(() => setShowStakeTokenSuccess(false), 6000)
            onStakeSuccess()
            return () => clearTimeout(timeout)
        }
    }, [state.stake.isSuccess])

    return (
        <div>
            {/* <h2>{name}</h2> */}
            <Input
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Amount to stake"
                type="number"
                inputProps={{ min: "0", step: "any" }}
                style={{ color: "red" }}
            />
            <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={handleApprove}
                style={{ marginLeft: "10px", marginRight: "10px" }}
            >
                Approve & Stake Tokens
            </Button>
            {/* <Button color="primary" variant="contained" size="large" onClick={handleStake}>
                Stake Tokens
            </Button> */}
            <Snackbar open={showErc20ApprovalSuccess} autoHideDuration={6000}>
                <Alert onClose={() => setShowErc20ApprovalSuccess(false)} severity="success">
                    ERC20 Approval Successful
                </Alert>
            </Snackbar>
            <Snackbar open={showStakeTokenSuccess} autoHideDuration={6000}>
                <Alert onClose={() => setShowStakeTokenSuccess(false)} severity="success">
                    Staking Successful
                </Alert>
            </Snackbar>
        </div>
    )
}
