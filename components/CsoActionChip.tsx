import { Group, Text } from "@mantine/core"
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi"
import { TiArrowBackOutline } from "react-icons/ti"

export enum CsoActionType {
    REJECT,
    SIGN,
    BACK
}
  
interface CsoActionChipProps {
    onClick: () => void,
    action: CsoActionType
    className?: string
}

export function CsoActionChip({ onClick, action, className }: CsoActionChipProps) {
    const mapActionToIcon = (action: CsoActionType) => (
      action == CsoActionType.REJECT ? <HiOutlineX /> : 
      action == CsoActionType.SIGN ? <HiOutlineCheck /> :
      <TiArrowBackOutline />)
    
  
    return (
      <Group className={`bg-contain rounded-full text-white px-8 py-3 hover:cursor-pointer ${className}`} onClick={onClick}>
        {mapActionToIcon(action)}
        <Text>{CsoActionType[action]}</Text>
      </Group>      
    )
}