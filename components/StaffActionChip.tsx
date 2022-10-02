import { AiOutlinePrinter } from "react-icons/ai"
import { BsFillPersonCheckFill, BsJournalCheck, BsShare } from "react-icons/bs"
import { TiArrowBackOutline } from "react-icons/ti"
import { ActionIcon } from "@mantine/core"

export enum staffActionType {
    PRINT,
    SHARE,
    SUBMIT
}

interface StaffActionChipProps {
    onClick: () => void,
    action: staffActionType,
    size?: number
}
  
export function StaffActionChip({ onClick, action }: StaffActionChipProps) {
  
    const mapActionToIcon = (action: staffActionType) => (
        action == staffActionType.PRINT ? <AiOutlinePrinter size={24} /> :
        action == staffActionType.SHARE ? <BsShare size={24}/> :
        action == staffActionType.SUBMIT ? <BsJournalCheck size={24}/> :
        <TiArrowBackOutline size={24}/>
        )

    return (
      <ActionIcon className='bg-white bg-contain rounded-full hover:cursor-pointer drop-shadow-md font-bold' size="xl" onClick={onClick}>
        {mapActionToIcon(action)}
      </ActionIcon>
    )
  }