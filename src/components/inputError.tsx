
type Props = {
    msg: string;
}

export function InputError({msg}: Props) {
  return (
    <div className="flex items-center text-red-500 text-xs">
    <div className="mr-1">⚠️</div>
    <p>{msg}</p>
  </div>
  )
}
