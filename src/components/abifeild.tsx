import { Input } from "antd";

type Props = {
    setAbi: (s:string) => void;
  }


export const AbiField = (
  {setAbi}: Props
) => {
  const { TextArea } = Input;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbi(e.target.value);
  };
  return (
    <div>
      <TextArea placeholder="input your abi files" onChange={handleChange} style={{height:'70vh'}} className="rounded-none"/>
    </div>
  );
};



