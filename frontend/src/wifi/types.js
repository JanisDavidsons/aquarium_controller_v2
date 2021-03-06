export const WiFiConnectionStatus = {
  WIFI_STATUS_IDLE : 0,
  WIFI_STATUS_NO_SSID_AVAIL : 1,
  WIFI_STATUS_CONNECTED : 3,
  WIFI_STATUS_CONNECT_FAILED : 4,
  WIFI_STATUS_CONNECTION_LOST : 5,
  WIFI_STATUS_DISCONNECTED : 6,
  WIFI_STATUS_NO_SHIELD : 255
}

export const WiFiEncryptionType = {
  WIFI_AUTH_OPEN : 0,
  WIFI_AUTH_WEP : 1,
  WIFI_AUTH_WEP_PSK : 2,
  WIFI_AUTH_WEP2_PSK : 3,
  WIFI_AUTH_WPA_WPA2_PSK : 4,
  WIFI_AUTH_WPA2_ENTERPRISE : 5
}
