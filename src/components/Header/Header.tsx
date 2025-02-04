import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography component="h6" variant="h6" color="textPrimary">
          Miniatures Shop
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton>
          <Badge badgeContent={4} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
