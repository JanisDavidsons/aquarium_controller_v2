import { NTPSyncStatus } from "./types";

export const isNtpActive = ({ status }) => status === NTPSyncStatus.NTP_ACTIVE;

export const ntpStatusHighlight = ({ status }, theme) => {
  switch (status) {
    case NTPSyncStatus.NTP_INACTIVE:
      return theme.palette.info.main;
    case NTPSyncStatus.NTP_ACTIVE:
      return theme.palette.success.main;
    default:
      return theme.palette.error.main;
  }
}

export const ntpStatus = ({ status }) => {
  switch (status) {
    case NTPSyncStatus.NTP_INACTIVE:
      return "Inactive";
    case NTPSyncStatus.NTP_ACTIVE:
      return "Active";
    default:
      return "Unknown";
  }
}
