"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { useAccount, useBalance, useSignMessage } from "wagmi";

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { signMessage, data: signature, isPending: isSignPending } = useSignMessage();

  const [message, setMessage] = useState("");

  const isCorrectNetwork = chain?.id === 83532;

  const handleSignMessage = async () => {
    if (!message) {
      alert("Please enter a message to sign.");
      return;
    }
    try {
      await signMessage({ message });
    } catch (err) {
      console.error("Message signing failed:", err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        <Wallet />
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>Base Batch D-2</h1>

        {isConnected && address && (
          <div className={styles.section}>
            {!isCorrectNetwork && (
              <div className={`${styles.console} ${styles.errorMessage}`}>
                <p>Wrong Network! Please switch to Base Sepolia in your wallet</p>
                <p className={styles.networkInfo}>
                  Current: {chain?.name || "unknown"} Require: Base Sepolia
                </p>
              </div>
            )}

            {/* Balance Display */}
            <div className={styles.card}>
              <p className={styles.label}>Connected Address:</p>
              <p className={styles.address}>{address}</p>
              {balance && (
                <div className={styles.balanceSection}>
                  <p className={styles.label}>ETH Balance:</p>
                  <p className={styles.balance}>
                    {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </p>
                </div>
              )}
            </div>

            {/* Message Signing */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Sign a Message (Gasless)</h2>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.input}
                placeholder="Enter message to sign"
              />
              <button
                onClick={handleSignMessage}
                disabled={isSignPending}
                className={styles.button}
              >
                {isSignPending ? "Signing..." : "Sign Message"}
              </button>

              {signature && (
                <p className={styles.signature}>
                  Signature: {signature}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
