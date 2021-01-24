import { AuthState } from "./modules/auth/interfaces/AuthState";
import { WalletState } from "./modules/wallet/interfaces/WalletState";

export interface State extends WalletState, AuthState {

}