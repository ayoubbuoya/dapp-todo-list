import React from "react";

export function SignInPrompt({ onClick }) {
  return (
    <div className="signin-prompt">
      <h2>Sign in to NEAR Wallet</h2>
      <br />
      <p style={{ textAlign: "center" }}>
        <button onClick={onClick}>Sign in</button>
      </p>
    </div>
  );
}

export function SignOutButton({ accountId, onClick }) {
  return (
    <button style={{ float: "right" }} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}
