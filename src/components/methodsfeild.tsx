
import { Interface } from "@ethersproject/abi";
import { CallContract } from "./call";
import {ExecuteContract} from './execute'
import { useState, useEffect } from "react";
import {  Fragment,FunctionFragment } from "@ethersproject/abi";

type Props = {
  abi: string;
  address: string;
  value: bigint;
};




export const MethodsFeild = ({ abi,address,value }: Props) => {
  //parse(abi);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [parseError, setParseError] = useState<boolean>(false);

  useEffect(() => {
    setParseError(false);
    try {
      const parsedAbi = JSON.parse(abi);
      const contractInterface = new Interface(parsedAbi);
      const newFragments: Fragment[] = [];
      contractInterface.fragments
        .filter((fragment) => fragment.type === "function")
        .map((fragment, index) => (newFragments[index] = fragment));
        setFragments(newFragments)
    } catch (e) {
      setParseError(true);
    }
  }, [abi]);


  if(abi===""||abi===undefined||abi===null){
    return <div>please input your abi</div>
  }
  if(parseError){
    return <div>parse error</div>
  }
  return (
    <div className="w-1/2">
                <label className="mb-2">Method: </label>
           {
                fragments.map((method)=>{
                    if((method as FunctionFragment).stateMutability=='view'||(method as FunctionFragment).stateMutability=='pure'){
                        console.log(method.name);
                    return <CallContract contractAddress={address} fragment={method} key={method.name}/>
                    }else{
                        return <ExecuteContract contractAddress={address} fragment={method} value={value} key={method.name}/>
                    }
                })
            }
    </div>
  );
};
