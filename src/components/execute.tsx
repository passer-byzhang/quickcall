import { useState } from "react";
import { Fragment, FunctionFragment } from "@ethersproject/abi";
import { useWriteContract } from "wagmi";
import { Button } from "antd";
import { Input } from "antd";
type Props = {
  contractAddress: string;
  fragment: Fragment;
  value: bigint;
};

export function ExecuteContract({ contractAddress, fragment, value }: Props) {
  //const chainId = useChainId();
  const { data: hash, writeContract } = useWriteContract();
  const [inputValues, setInputValues] = useState<string[]>(
    new Array(fragment.inputs.length).fill("")
  );
  const [showInputs, setShowInputs] = useState(false);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };
  //contractAddress = "0x32ae93f08219baf7fdeb8ed99c6a0704c4aee549";
  //inputArea for every inpiut value
  if ((fragment as FunctionFragment).stateMutability == "nonpayable") {
    value = BigInt(0);
  }
  async function send() {
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: [fragment],
      functionName: fragment.name,
      args: [...inputValues],
      value: value,
    });
  }

  return (
    <div>
      <Button
        onClick={toggleInputs}
        style={{ backgroundColor: "red", color: "white" }}
      >
        {fragment.name}
      </Button>
      <div>
        {showInputs && (
          <div>
            <div>
              {fragment.inputs.map((input, index) => {
                console.log(input.type);
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
            <Button
              onClick={() => send()}
              style={{ backgroundColor: "red", color: "white" }}
            >
              send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
