import { ethers } from "ethers";
import { Result } from "./result";

import { useState } from "react";
import { Fragment } from "@ethersproject/abi";
import {Button,Input} from 'antd'

interface CallProps {
  contractAddress: string;
  fragment: Fragment;
}

export function CallContract({ contractAddress, fragment }: CallProps) {

  const [inputValues, setInputValues] = useState<string[]>(
    new Array(fragment.inputs.length).fill("")
  );
  const [showInputs, setShowInputs] = useState(false);
  const [result, setResult] = useState<string>("");

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  const provider = new ethers.BrowserProvider(window.ethereum);

  async function readContract() {
    setResult("");
    const abi = [fragment];
    const address = contractAddress;
    const args = inputValues;
    const contract = new ethers.Contract(address, abi, provider);
    await contract
      .getFunction(fragment.name)
      .call(null, ...args).then((res) => {
        setResult(res.toString());
    });

  }

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
                  <Input
                    key={index}
                    placeholder={`${input.name}:${input.type}`}
                    type={input.type}
                    onChange={(e) => {
                      const newInputValues = inputValues;
                      newInputValues[index] = e.target.value;
                      setInputValues(newInputValues);
                    }}
                  />
                );
              })}
            </div>
            {result!="" && <Result msg={result} />}
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
