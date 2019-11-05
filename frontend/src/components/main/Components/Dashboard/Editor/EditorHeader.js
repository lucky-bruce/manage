import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function PersistentDrawerLeft(props) {
  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Ribeiro Ababamentos
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <div style={{ marginTop: '50px', }}></div>
      </main>
    </div>
  );
}
