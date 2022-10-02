import { Group, Text } from "@mantine/core"
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi"
import { TiArrowBackOutline } from "react-icons/ti"

export enum doActionType {
    REJECT,
    SIGN,
    BACK
}
  
interface DOActionChipProps {
    onClick: () => void,
    action: doActionType
    className: string
}

export function DOActionChip({ onClick, action, className }: DOActionChipProps) {
    const mapActionToIcon = (action: doActionType) => (
      action == doActionType.REJECT ? <HiOutlineX /> : 
      action == doActionType.SIGN ? <HiOutlineCheck /> :
      <TiArrowBackOutline />)
    
  
    return (
      <Group className={`bg-contain rounded-full text-white px-8 py-3 hover:cursor-pointer ${className}`} onClick={onClick}>
        {mapActionToIcon(action)}
        <Text>{doActionType[action]}</Text>
      </Group>      
    )
}