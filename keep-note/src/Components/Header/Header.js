import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { Home, LoginRounded, AccountCircleRounded, LogoutRounded, PersonAddRounded } from "@mui/icons-material";
import SearchNote from "../SearchNote/SearchNote";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export default function Header({ onSearchNote, onClearNote}) {
  const { loggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
        {/* Left Section: Title + Search */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontFamily: '"Protest Guerrilla", sans-serif',
              color: "teal",
              textShadow: "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white"
            }}
          >
            KeepNote
          </Typography>
           {loggedIn &&(
            
              <SearchNote onSearchNote={onSearchNote} onClearNote={onClearNote} />
              
          )}
        </Box>

         {/* Right Section: Icons */}
         <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
         {loggedIn &&(
          <IconButton
            sx={{
              color: "#FFFFFF",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#20B2AA", // lightseagreen on hover
              },
            }}
            onClick={()=>navigate('/notes')}
          >
            <Home />
          </IconButton>
         )}
          {loggedIn &&(
          <IconButton
          onClick={() => {
            const userId = localStorage.getItem("userId");
            if (userId) {
              navigate(`/accountdetail/${userId}`);
            }
          }}
          sx={{
            color: "#FFFFFF",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#20B2AA",
            },
          }}
        >
          <AccountCircleRounded />
        </IconButton>
        
          )}
          {loggedIn &&(
          <IconButton
            onClick={()=>
              {
              logout();
              navigate('/')
              }}
            sx={{
              color: "#FFFFFF",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#20B2AA",
              },
            }}
          >
            <LogoutRounded />
          </IconButton>
          )}
          {!loggedIn&& (
        <>
          <IconButton
            onClick={()=>{navigate('/')}}
            sx={{
              color: "#FFFFFF",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#20B2AA",
              },
            }}
          >
            <LoginRounded />
          </IconButton>
          <IconButton
          onClick={()=>{navigate('/register')}}
          sx={{
            color: "#FFFFFF",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#20B2AA",
            },
          }}
        >
          <PersonAddRounded />
        </IconButton>
      </>
          )}
          

        </Box>
      </Toolbar>
    </AppBar>
  );
}
