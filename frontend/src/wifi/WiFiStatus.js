import { WiFiConnectionStatus } from './types';

export const isConnected = ({ status }) => status === WiFiConnectionStatus.WIFI_STATUS_CONNECTED;

export const wifiStatusHighlight = ({ status }, theme) => {
  switch (status) {
    case WiFiConnectionStatus.WIFI_STATUS_IDLE:
    case WiFiConnectionStatus.WIFI_STATUS_DISCONNECTED:
    case WiFiConnectionStatus.WIFI_STATUS_NO_SHIELD:
      return theme.palette.info.main;
    case WiFiConnectionStatus.WIFI_STATUS_CONNECTED:
      return theme.palette.success.main;
    case WiFiConnectionStatus.WIFI_STATUS_CONNECT_FAILED:
    case WiFiConnectionStatus.WIFI_STATUS_CONNECTION_LOST:
      return theme.palette.error.main;
    default:
      return theme.palette.warning.main;
  }
}

export const wifiStatus = ({ status }) => {
  switch (status) {
    case WiFiConnectionStatus.WIFI_STATUS_NO_SHIELD:
      return "Inactive";
    case WiFiConnectionStatus.WIFI_STATUS_IDLE:
      return "Idle";
    case WiFiConnectionStatus.WIFI_STATUS_NO_SSID_AVAIL:
      return "No SSID Available";
    case WiFiConnectionStatus.WIFI_STATUS_CONNECTED:
      return "Connected";
    case WiFiConnectionStatus.WIFI_STATUS_CONNECT_FAILED:
      return "Connection Failed";
    case WiFiConnectionStatus.WIFI_STATUS_CONNECTION_LOST:
      return "Connection Lost";
    case WiFiConnectionStatus.WIFI_STATUS_DISCONNECTED:
      return "Disconnected";
    default:
      return "Unknown";
  }
}
