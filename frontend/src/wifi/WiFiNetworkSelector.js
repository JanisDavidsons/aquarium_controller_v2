import React, { Component } from 'react';

import { Avatar, Badge } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar } from '@material-ui/core';

import WifiIcon from '@material-ui/icons/Wifi';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { isNetworkOpen, networkSecurityMode } from './WiFiSecurityModes';
import { WiFiConnectionContext } from './WiFiConnectionContext';

class WiFiNetworkSelector extends Component {
  renderNetwork = (network) => {
    return (
      <ListItem key={network.bssid} button onClick={() => WiFiConnectionContext.selectNetwork(network)}>
        <ListItemAvatar>
          <Avatar>
            {isNetworkOpen(network) ? <LockOpenIcon /> : <LockIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={network.ssid}
          secondary={"Security: " + networkSecurityMode(network) + ", Ch: " + network.channel}
        />
        <ListItemIcon>
          <Badge badgeContent={network.rssi + "db"}>
            <WifiIcon />
          </Badge>
        </ListItemIcon>
      </ListItem>
    );
  }

  render() {
    return (
      <List>
        {this.props.networkList.networks.map(this.renderNetwork)}
      </List>
    );
  }

}

export default WiFiNetworkSelector;
