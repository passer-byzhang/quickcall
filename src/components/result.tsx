type Props = {
  msg: string;
};

export function Result({ msg }: Props) {
  console.log("msg: " + msg);
  return (
    <div className="flex items-center text-black-500 text-xs">
      <div className="mr-1">result: </div>
      <p>{msg}</p>
    </div>
  );
}


export function InputError({ msg }: Props) {
  return (
    <div className="flex items-center text-red-500 text-xs">
      <div className="mr-1">⚠️</div>
      <p>{msg}</p>
    </div>
  );
}

export function Error({ msg }: Props) {
  return (
    <div className="flex items-center text-red-500 text-xs">
      <p>{"⚠️" + msg}</p>
    </div>
  );
}