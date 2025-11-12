import { Link } from "react-router-dom";
import useNavbarLinksHook from "../hooks/useNavbarLinksHook";
import { LogOut, Menu as MenuIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemButton,
    useTheme,
    useMediaQuery,
    Typography
} from "@mui/material";
import { useState } from "react";
import logoUrl from "../assets/logo.png";


interface DynamicLinksProps {
    onItemClick?: () => void;
    isMobile?: boolean;
}

interface NavbarProps {
    handleLogout: () => void;
}



const DynamicLinks = ({ onItemClick, isMobile = false }: DynamicLinksProps) => {
    const location = useLocation();
    const navbarLinks = useNavbarLinksHook();
    const userData = useAppSelector((state) => (state as any)?.user?.userData); //render tab by user role

    return navbarLinks
        .filter((tab) => tab.role.includes(userData?.role))
        .map((link, index) => {
            const splitPath = location.pathname.split('/');
            const currentPath = `/${splitPath[splitPath.length - 1]}`;
            const linkPath = link.href.startsWith('/') ? link.href : `/${link.href}`;
            const isActive = currentPath === linkPath;

            if (isMobile) {
                return (
                    <MenuItem
                        key={index}
                        component={Link}
                        to={link.href}
                        onClick={onItemClick}
                        sx={{
                            color: isActive ? 'primary.main' : 'text.primary',
                            fontWeight: isActive ? 'bold' : 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {link.icon}
                        <Typography>{link.title}</Typography>
                    </MenuItem>
                );
            }

            return (
                <ListItem key={index} disablePadding sx={{ width: 'auto' }}>
                    <ListItemButton
                        component={Link}
                        to={link.href}
                        sx={{
                            borderRadius: 1,
                            mx: 0.5,
                            color: isActive ? 'primary.main' : 'text.primary',
                            backgroundColor: isActive ? 'primary.main' : 'transparent',
                            '&:hover': {
                                backgroundColor: isActive ? 'primary.main' : 'action.hover',
                            },
                            width: 'auto',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ color: isActive ? 'white' : 'inherit' }}>
                                {link.icon}
                            </Box>
                            <Typography sx={{ color: isActive ? 'white' : 'inherit' }}>{link.title}</Typography>
                        </Box>
                    </ListItemButton>
                </ListItem>
            );
        });
};

const Navbar = ({ handleLogout }: NavbarProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleItemClick = () => {
        handleMenuClose();
    };



    return (
        <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: 'background.paper' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Mobile menu */}
                {isMobile && (
                    <Box>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuClick}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="navbar-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <DynamicLinks onItemClick={handleItemClick} isMobile={true} />
                        </Menu>
                    </Box>
                )}

                {/* Logo */}
                <Box component={Link} to="dashboard" sx={{ display: 'flex', alignItems: 'center', maxWidth: 80 }}>
                    <Box
                        component="img"
                        src={logoUrl}
                        alt="Logo"
                        sx={{ width: '100%' }}
                    />
                </Box>

                {/* Desktop navigation */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                        <List sx={{ display: 'flex', p: 0 }}>
                            <DynamicLinks />
                        </List>
                    </Box>
                )}

                {/* Logout button */}
                <Box>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={handleLogout}
                        startIcon={<LogOut size={20} />}
                        sx={{
                            borderColor: 'divider',
                            color: 'text.primary',
                            borderRadius: 1,
                            '&:hover': {
                                borderColor: 'primary.main',
                                color: 'primary.main',
                            }
                        }}
                    >
                        התנתק
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
