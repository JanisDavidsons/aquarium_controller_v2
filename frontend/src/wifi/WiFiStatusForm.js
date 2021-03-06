import React, { Component, Fragment } from 'react';

import { withTheme } from '@mui/styles';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import DNSIcon from '@mui/icons-material/Dns';
import WifiIcon from '@mui/icons-material/Wifi';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import RefreshIcon from '@mui/icons-material/Refresh';

import { FormActions, FormButton, HighlightAvatar } from '../components';
import { wifiStatus, wifiStatusHighlight, isConnected } from './WiFiStatus';

class WiFiStatusForm extends Component {

  dnsServers(status) {
    if (!status.dns_ip_1) {
      return "none";
    }
    return status.dns_ip_1 + (status.dns_ip_2 ? ',' + status.dns_ip_2 : '');
  }

  createListItems() {
    const { data, theme } = this.props
    return (
      <Fragment>
        <ListItem>
          <ListItemAvatar>
            <HighlightAvatar color={wifiStatusHighlight(data, theme)}>
              <WifiIcon />
            </HighlightAvatar>
          </ListItemAvatar>
          <ListItemText primary="Status" secondary={wifiStatus(data)} />
        </ListItem>
        <Divider variant="inset" component="li" />
        {
          isConnected(data) &&
          <Fragment>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SettingsInputAntennaIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="SSID" secondary={data.ssid} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>IP</Avatar>
              </ListItemAvatar>
              <ListItemText primary="IP Address" secondary={data.local_ip} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DeviceHubIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="MAC Address" secondary={data.mac_address} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>#</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Subnet Mask" secondary={data.subnet_mask} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SettingsInputComponentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Gateway IP" secondary={data.gateway_ip || "none"} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DNSIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="DNS Server IP" secondary={this.dnsServers(data)} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        }
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <List>
          {this.createListItems()}
        </List>
        <FormActions>
          <FormButton startIcon={<RefreshIcon />} variant="contained" color="secondary" onClick={this.props.loadData}>
            Refresh
          </FormButton>
        </FormActions>
      </Fragment>
    );
  }

}

export default withTheme(WiFiStatusForm);
