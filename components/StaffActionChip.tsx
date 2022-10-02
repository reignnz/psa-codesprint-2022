import { AiOutlinePrinter } from "react-icons/ai"
import { BsShare } from "react-icons/bs"
import { TiArrowBackOutline } from "react-icons/ti"
import { ActionIcon } from "@mantine/core"

export enum staffActionType {
    PRINT,
    SHARE
}

interface StaffActionChipProps {
    onClick: () => void,
    action: staffActionType,
    size?: number
}
  
export function StaffActionChip({ onClick, action, size }: StaffActionChipProps) {
  
    const mapActionToIcon = (action: staffActionType) => (
        action == staffActionType.PRINT ? <AiOutlinePrinter size={size} /> :
        action == staffActionType.SHARE ? <BsShare size={size}/> :
        <TiArrowBackOutline size={size}/>
        )

    return (
      <ActionIcon className='bg-white bg-contain rounded-full hover:cursor-pointer' size="lg" onClick={onClick}>
        {mapActionToIcon(action)}
      </ActionIcon>
    )
  }