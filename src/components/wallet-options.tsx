import { useConnect } from "wagmi";
import { useState } from "react";
import {Button} from 'antd';

import { useAccount, useDisconnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const [isHovered, setIsHovered] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (isConnected) {
    return (
      <div>
        <Button
          onClick={() => disconnect()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: '150px', height: '30px' }}

        >
          {isHovered
            ? "Disconnect"
            : String(address).slice(0, 6) + "..." + String(address).slice(-4)}
        </Button>
      </div>
    );
  } else {
    return connectors.map((connector) => (
      <Button key={connector.uid} onClick={() => connect({ connector })}>
        {connector.name}
      </Button>
    ));
  }
}
