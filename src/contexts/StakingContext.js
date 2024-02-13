import React, { createContext, useContext, useState } from "react"

const StakingContext = createContext()

export const useStakingContext = () => useContext(StakingContext)

export const StakingProvider = ({ children }) => {
    const [stakeSuccess, setStakeSuccess] = useState(false)

    return (
        <StakingContext.Provider value={{ stakeSuccess, setStakeSuccess }}>
            {children}
        </StakingContext.Provider>
    )
}
