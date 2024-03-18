import { ethers } from "ethers";

import { useState } from "react";
import { Fragment } from "@ethersproject/abi";
import {Button} from 'antd'

interface CallProps {
  contractAddress: string;
  fragment: Fragment;
}

export function CallContract({ contractAddress, fragment }: CallProps) {
  //const chainId = useChainId();
  const [inputValues, setInputValues] = useState<string[]>(
    new Array(fragment.inputs.length).fill("")
  );
  const [showInputs, setShowInputs] = useState(false);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  const provider = new ethers.BrowserProvider(window.ethereum);

  async function readContract() {
    const abi = [JSON.stringify(fragment)];
    const address = contractAddress;
    const args = inputValues;
    const contract = new ethers.Contract(address, abi, provider);
    const result = await contract
      .getFunction(fragment.name)
      .call(null, ...args);
    return result;
  }

  //inputArea for every inpiut value

  return (
    <div>
      <Button
        onClick={toggleInputs}
        style={{ backgroundColor: "blue", color: "white" }}
      >
        {fragment.name}
      </Button>
      <div>
        {showInputs && (
          <div>
            <div>
              {fragment.inputs.map((input, index) => {
                return (
                  <input
                    key={index}
                    type={input.type}
                    value={inputValues[index]}
                    onChange={(e) => {
                      const newInputValues = inputValues;
                      newInputValues[index] = e.target.value;
                      setInputValues(newInputValues);
                    }}
                  />
                );
              })}
            </div>
            <Button
              onClick={() => readContract()}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              call
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
