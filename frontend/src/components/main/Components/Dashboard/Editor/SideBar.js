import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { logout } from "../../../services/auth";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  gray:{
    color: 'rgba(0, 0, 0, 0.54)'
  }
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
      <Link to='/'>
          <ListItem button >
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" Back To Site"} />
          </ListItem>
        </Link>
        <Link to='/editor-dasboard'>
          <ListItem button >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" Dashboard"} />
          </ListItem>
        </Link>
        <Link to='/editor-portfolio'>
          <ListItem button >
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" Portfolio"} />
          </ListItem>
        </Link>
        <Link to='/editor-ourteam'>
          <ListItem button >
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" Team"} />
          </ListItem>
        </Link>
        <Link to='/editor-news'>
          <ListItem button >
            <ListItemIcon><AnnouncementIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" News"} />
          </ListItem>
        </Link>
        <Link to='/editor-about'>
          <ListItem button >
            <ListItemIcon><HelpIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" About"} />
          </ListItem>
        </Link>
        <Link to='/editor-sectors'>
          <ListItem button >
            <ListItemIcon><SettingsEthernetIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" Sectors"} />
          </ListItem>
        </Link>
        <Divider />
        <Link to='#'>
          <ListItem button onClick={() => {
            logout(() => {
              
            });
          }}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText className={classes.gray} primary={" Logout"} />
          </ListItem>
        </Link>
      </List>
      

    </div>
  );


  return (
    <div>
      <SwipeableDrawer
        open={props.open}
        onClose={props.toggleDrawer(false)}
        onOpen={props.toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>

    </div>
  );
}
