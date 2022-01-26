import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Drawer, AppBar, Toolbar, Avatar, Divider, Button, Box, IconButton } from '@mui/material';
import { ClickAwayListener, Popper, Hidden, Typography } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar } from '@mui/material';
import { Card, CardContent, CardActions } from '@mui/material';

import { withStyles, createStyles, withTheme } from '@mui/styles';

import WifiIcon from '@mui/icons-material/Wifi';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';

import ProjectMenu from '../project/ProjectMenu';
import { PROJECT_NAME } from '../api';
import { withAuthenticatedContext } from '../authentication';
import { withFeatures } from '../features/FeaturesContext';

const drawerWidth = 290;

const styles = (theme) => createStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolbarImage: {
    [theme.breakpoints.up('xs')]: {
      height: 24,
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      height: 36,
      marginRight: theme.spacing(3)
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1
  },
  authMenu: {
    zIndex: theme.zIndex.tooltip,
    maxWidth: 400,
  },
  authMenuActions: {
    padding: theme.spacing(2),
    "& > * + *": {
      marginLeft: theme.spacing(2),
    }
  },
});

class MenuAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      authMenuOpen: false
    };
  }

  anchorRef = React.createRef();

  handleToggle = () => {
    this.setState({ authMenuOpen: !this.state.authMenuOpen });
  }

  handleClose = (event) => {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.currentTarget)) {
      return;
    }
    this.setState({ authMenuOpen: false });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme, children, sectionTitle, authenticatedContext, features } = this.props;
    const { mobileOpen, authMenuOpen } = this.state;
    const path = this.props.match.url;
    const drawer = (
      <div>
        <Toolbar>
          <Box display="flex">
            <img src="/app/icon.png" className={classes.toolbarImage} alt={PROJECT_NAME} />
          </Box>
          <Typography variant="h6" color="textPrimary">
            {PROJECT_NAME}
          </Typography>
          <Divider absolute />
        </Toolbar>
        {features.project && (
          <Fragment>
            <ProjectMenu />
            <Divider />
          </Fragment>
        )}
        <List>
          <ListItem to='/wifi/' selected={path.startsWith('/wifi/')} button component={Link}>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="WiFi Connection" />
          </ListItem>
          <ListItem to='/ap/' selected={path.startsWith('/ap/')} button component={Link}>
            <ListItemIcon>
              <SettingsInputAntennaIcon />
            </ListItemIcon>
            <ListItemText primary="Access Point" />
          </ListItem>
          {features.ntp && (
          <ListItem to='/ntp/' selected={path.startsWith('/ntp/')} button component={Link}>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Network Time" />
          </ListItem>
          )}
          {features.mqtt && (
            <ListItem to='/mqtt/' selected={path.startsWith('/mqtt/')} button component={Link}>
              <ListItemIcon>
                <DeviceHubIcon />
              </ListItemIcon>
              <ListItemText primary="MQTT" />
            </ListItem>
          )}
          {features.security && (
            <ListItem to='/security/' selected={path.startsWith('/security/')} button component={Link} disabled={!authenticatedContext.me.admin}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Security" />
            </ListItem>
          )}
          <ListItem to='/system/' selected={path.startsWith('/system/')} button component={Link} >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="System" />
          </ListItem>
        </List>
      </div>
    );

    const userMenu = (
      <div>
        <IconButton
          ref={this.anchorRef}
          aria-owns={authMenuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Popper open={authMenuOpen} anchorEl={this.anchorRef.current} transition className={classes.authMenu}>
          <ClickAwayListener onClickAway={this.handleClose}>
            <Card id="menu-list-grow">
              <CardContent>
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Signed in as: " + authenticatedContext.me.username} secondary={authenticatedContext.me.admin ? "Admin User" : undefined} />
                  </ListItem>
                </List>
              </CardContent>
              <Divider />
              <CardActions className={classes.authMenuActions}>
                <Button variant="contained" fullWidth color="primary" onClick={authenticatedContext.signOut}>Sign Out</Button>
              </CardActions>
            </Card>
          </ClickAwayListener>
        </Popper>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              {sectionTitle}
            </Typography>
            {features.security && userMenu}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

export default withTheme(
    withFeatures(
      withAuthenticatedContext(
        withStyles(styles)(MenuAppBar)
      )
    )
  );
