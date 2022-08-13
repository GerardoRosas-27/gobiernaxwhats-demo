import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Ui, Icon } from '@components/material-ui';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(Ui.InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Ui.Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Ui.MenuItem onClick={handleMenuClose}>Profile</Ui.MenuItem>
      <Ui.MenuItem onClick={handleMenuClose}>My account</Ui.MenuItem>
    </Ui.Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Ui.Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Ui.MenuItem>
        <Ui.IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Ui.Badge badgeContent={4} color="error">
            <Icon.MailIcon />
          </Ui.Badge>
        </Ui.IconButton>
        <p>Messages</p>
      </Ui.MenuItem>
      <Ui.MenuItem>
        <Ui.IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Ui.Badge badgeContent={17} color="error">
            <Icon.NotificationsIcon />
          </Ui.Badge>
        </Ui.IconButton>
        <p>Notifications</p>
      </Ui.MenuItem>
      <Ui.MenuItem onClick={handleProfileMenuOpen}>
        <Ui.IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Icon.AccountCircle />
        </Ui.IconButton>
        <p>Profile</p>
      </Ui.MenuItem>
    </Ui.Menu>
  );

  return (
    <Ui.Box sx={{ display: 'flex' }}>
      <Ui.AppBar position="static">
        <Ui.Toolbar>
          <Ui.IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Icon.MenuIcon />
          </Ui.IconButton>
          <Ui.Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Ui.Typography>
          <Search>
            <SearchIconWrapper>
              <Icon.SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Ui.Box sx={{ flexGrow: 1 }} />
          <Ui.Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Ui.IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Ui.Badge badgeContent={4} color="error">
                <Icon.MailIcon />
              </Ui.Badge>
            </Ui.IconButton>
            <Ui.IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Ui.Badge badgeContent={17} color="error">
                <Icon.NotificationsIcon />
              </Ui.Badge>
            </Ui.IconButton>
            <Ui.IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Icon.AccountCircle />
            </Ui.IconButton>
          </Ui.Box>
          <Ui.Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Ui.IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Icon.MoreIcon />
            </Ui.IconButton>
          </Ui.Box>
        </Ui.Toolbar>
      </Ui.AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Ui.Box>
  );
}


export default Navbar;