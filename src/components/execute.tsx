import { useState } from "react";
import { Fragment, FunctionFragment } from "@ethersproject/abi";
import { useWriteContract } from "wagmi";
import { Input } from "antd";
import { CustomButton } from "./Button";
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
  function isPayable() {
    if ((fragment as FunctionFragment).stateMutability == "nonpayable") {
        return false;
      }else{
        return true;
      }
  }
  //contractAddress = "0x32ae93f08219baf7fdeb8ed99c6a0704c4aee549";
  //inputArea for every inpiut value
  if (isPayable()) {
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

      <CustomButton
        onClick={
          () => {
            if (fragment.inputs.length == 0) {
              send();
            } else {
              toggleInputs();
            }
          }
        }
        msg={fragment.name}
        type={isPayable()?"payable":"nonpayable"}
      />
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
                    className="mb-2 rounded-none"
                  />
                );
              })}
            </div>
            <CustomButton
              onClick={() => send()}
              msg="send"
              type={isPayable()?"payable":"nonpayable"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
