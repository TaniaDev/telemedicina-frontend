import { AppBar, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Box } from '@mui/system'
import { useDrawerContext } from '../context/DrawerContext'

export default function BaseLayout({ children, title, toolbar }) {
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { toggleDrawerOpen } = useDrawerContext()

    return (
        <>        
            <AppBar position='relative'>
                <Box padding={1} height={theme.spacing(12)} display='flex' alignItems='center'>
                    {smDown && (
                        <IconButton onClick={toggleDrawerOpen} color="inherit">
                            <Menu />
                        </IconButton>
                    )}
                    <Typography marginLeft='4%' variant='h5'>
                        {title}
                    </Typography>
                </Box>
            </AppBar>
            {toolbar && (
                <Box>
                    {toolbar}
                </Box>
            )}
            <Box margin='3% 5% 0 5%'height='100%' display='flex' flexDirection='column' gap={1}>
                <Box>
                    {children}
                </Box>
            </Box>
        </>
    )
}