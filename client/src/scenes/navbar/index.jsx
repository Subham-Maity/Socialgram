import React from 'react';
import { useState } from 'react';
import { Typography,useTheme, useMediaQuery,IconButton,InputBase, FormControl, Select, MenuItem,Box} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Search,DarkMode, LightMode,Message, Notifications, Help, Menu, Close} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";

import FlexBetween from 'components/FlexBetween';

const Navbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const primaryLight = theme.palette.primary.light;

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const neutralLight = theme.palette.neutral.light;

    const dispatch = useDispatch();
    const dark = theme.palette.neutral.dark;
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const background = theme.palette.background.default;
    const user = useSelector((state) => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween>
            {/* Navbar left side */}
            <FlexBetween>
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                        },
                    }}
                    >
                    Socialgram
                </Typography>

                {isNonMobileScreens && (
                <FlexBetween
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
                )}
            </FlexBetween>

            {/* Navbar right side */}
            {/* desktop navbar  */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                    
                </FlexBetween>
            ) : (
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
            >
                {/* CLOSE ICON */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close />
                    </IconButton>
                </Box>

                {/* MENU ITEMS */}
                <FlexBetween
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="3rem"
                >
                    <IconButton
                    onClick={() => dispatch(setMode())}
                    sx={{ fontSize: "25px" }}
                    >
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                <Select
                    value={fullName}
                    sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                        pr: "0.25rem",
                        width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                        backgroundColor: neutralLight,
                    },
                    }}
                    input={<InputBase />}
                >
                    <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                    </MenuItem>
                </Select>
            </FormControl>
                </FlexBetween>
            </Box>
        )}
        </FlexBetween>
    )
}

export default Navbar