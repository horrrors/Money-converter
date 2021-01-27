import { AuthState } from "./modules/auth/interfaces/AuthState";
import { ConvertOrderState } from "./modules/convertOrder/interfaces/ConvertOrderState";
import { WalletState } from "./modules/wallet/interfaces/WalletState";

export interface State extends WalletState, AuthState, ConvertOrderState {

}