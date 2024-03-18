
import { Input } from "antd";
import { InputError } from "./inputError";
import { isAddress } from "../utils/formatters";
import { useState } from "react";
type ContractAddressInputProps = {
    contractAddress: string;
    setAddress: (s:string) => void;
}

export function ContractAddressInput({contractAddress,setAddress}: ContractAddressInputProps) {
    const updateContractAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }
  return (
    <>
        <label className="mb-2">Contract Address: </label>
        <Input onChange={updateContractAddress} className="w-1/3 rounded-none"></Input>
        { (contractAddress!="") &&( !isAddress(contractAddress)) && 
        <InputError msg="please input a valid address" />
      }
    </>
  )
}

type ValueInputProps = {
    setValue: (s:bigint) => void;
}

export function ValueInput({setValue}: ValueInputProps) {
    const [parseError, setParseError] = useState<boolean>(false);
    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParseError(false);
        if(isNaN(parseInt(e.target.value))){
            setValue(BigInt(0));
            return;
        }
        try{
            setValue(BigInt(e.target.value));
        }catch(e){
            setValue(BigInt(0));
            setParseError(true);
        }
    }
    return (
        <>
            <label className="mb-2">Value: </label>
            <Input onChange={updateValue} className="w-1/3 rounded-none"></Input>
            {parseError && <InputError msg="please input a valid number"/>}
        </>
    )
}