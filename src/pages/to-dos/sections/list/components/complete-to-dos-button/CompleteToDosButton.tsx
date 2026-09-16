import { useContext } from "react"
import { ToDosStateContext } from "../../state/ToDosStateContext"
import { observer } from "mobx-react-lite"

export const CompleteToDosButton = observer(({
  onClick,
  className,
}: {
  onClick: () => unknown,
  className?: string,
}) => {
  const toDosState = useContext(ToDosStateContext)

  return (
    <button
      type="button"
      className={className}
      data-cy="complete-selected-to-dos-button"
      disabled={toDosState.selectedToDoIds.length === 0}
      onClick={onClick}
    >
      Complete
    </button>
  )
})
