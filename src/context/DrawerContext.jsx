import { createContext, useCallback, useContext, useState } from 'react'

const DrawerContext = createContext()

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}

export default function DrawerProvider({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, [])

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    )
}