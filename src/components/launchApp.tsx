import { MethodsFeild } from "./methodsfeild";
import { AbiField } from "./abifeild";
import { useState } from "react";
import {ContractAddressInput,ValueInput} from "./Input";
export const LaunchApp = () => {
  const [abi, setAbi] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [value, setValue] = useState<bigint>(BigInt(0));

  const updateAbi = (s: string) => {
    setAbi(s);
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/2 px-4">
        <AbiField setAbi={updateAbi} />
      </div>
      <div className="flex flex-col w-1/2 px-4">
        <ContractAddressInput contractAddress={contractAddress} setAddress={setContractAddress} />
        <ValueInput setValue={setValue}/>
        <MethodsFeild abi={abi} address={contractAddress} value={value} />
      </div>
    </div>
  );
};
