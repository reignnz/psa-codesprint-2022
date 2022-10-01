import { Group, Text } from "@mantine/core"
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi"
import { TiArrowBackOutline } from "react-icons/ti"

enum actionType {
    REJECT,
    SIGN,
    BACK
}
  
interface DOActionChipProps {
    onClick: () => void,
    action: actionType
    className: string
}

export function DOActionChip({ onClick, action, className }: DOActionChipProps) {
    const mapActionToIcon = (action: actionType) => (
      action == actionType.REJECT ? <HiOutlineX /> : 
      action == actionType.SIGN ? <HiOutlineCheck /> :
      <TiArrowBackOutline />)
    
  
    return (
      <Group className={`bg-contain rounded-full text-white px-8 py-3 hover:cursor-pointer ${className}`} onClick={onClick}>
        {mapActionToIcon(action)}
        <Text>{actionType[action]}</Text>
      </Group>      
    )
}