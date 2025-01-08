import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import LaunchPad from "./components/LaunchPad";
function App() {
  return (
    <div>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/pxIMU-70pUbKHm7JakxP84uVwLfp9Qeb"
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <LaunchPad />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
export default App;
