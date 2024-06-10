import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CheckCircledIcon, CrossCircledIcon, LapTimerIcon, LoopIcon, StarFilledIcon } from "@radix-ui/react-icons"
  
export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]
  

export const statuses = [
    {
        label: "Pending",
        value: "pending",
        icon: LapTimerIcon
    },
    {
        label: "Appointed",
        value: "appointed",
        icon: StarFilledIcon
    },
    {
        label: "In Progress",
        value: "progressing",
        icon: LoopIcon
    },
    {
        label: "Done",
        value: "done",
        icon: CheckCircledIcon
    },
    {
        label: "Cancelled",
        value: "cancelled",
        icon: CrossCircledIcon
    }
]

