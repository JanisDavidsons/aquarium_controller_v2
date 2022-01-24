import { APProvisionMode } from "./types";

export const isAPEnabled = ({ provision_mode }) => {
    return provision_mode === APProvisionMode.AP_MODE_ALWAYS || provision_mode === APProvisionMode.AP_MODE_DISCONNECTED;
}
