import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Drawerr(props) {
  const classes = useStyles();

  const openCourses = () => {
    props.changePage('courses');
    props.closeDrawer();
  }
  //apelam din props functia pasata din App numita changePage
  const switchDashboard = () => {
    props.changePage('dashboard');
    props.closeDrawer();
  }
  const openChat = () => {
    props.changePage('chat');
    props.closeDrawer();
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"

    >
      <List>
        <ListItem button key={'Dashboard'} onClick={switchDashboard}>
          <ListItemIcon>{<InboxIcon />}</ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>

        <ListItem button key={'Cursuri'} onClick={openCourses}>
          <ListItemIcon>{<InboxIcon />}</ListItemIcon>
          <ListItemText primary={'Cursuri'} />
        </ListItem>

        <ListItem button key={'Resurse'}>
          <ListItemIcon>{<MailIcon />}</ListItemIcon>
          <ListItemText primary={'Resurse'} />
        </ListItem>

        <ListItem button key={'Chat'} onClick={openChat}>
          <ListItemIcon>{<MailIcon />}</ListItemIcon>
          <ListItemText primary={'Chat'} />
        </ListItem>
      </List>
    </div>

  );

  return (
    <Drawer open={props.isOpen}
      onClose={props.closeDrawer}
    >
      {list()}
    </Drawer>
  );
}







