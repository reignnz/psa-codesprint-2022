import { AiOutlinePrinter } from "react-icons/ai"
import { BsShare } from "react-icons/bs"
import { TiArrowBackOutline } from "react-icons/ti"
import { ActionIcon } from "@mantine/core"

enum actionType {
    PRINT,
    SHARE
}

interface StaffActionChipProps {
    onClick: () => void,
    action: actionType
}
  
export function StaffActionChip({ onClick, action }: StaffActionChipProps) {
  
    const mapActionToIcon = (action: actionType) => (
        action == actionType.PRINT ? <AiOutlinePrinter /> :
        action == actionType.SHARE ? <BsShare /> :
        <TiArrowBackOutline />
        )

    return (
      <ActionIcon className=' bg-white bg-contain rounded-full hover:cursor-pointer' size="xl" onClick={onClick}>
        {mapActionToIcon(action)}
      </ActionIcon>
    )
  }