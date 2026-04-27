import { useContext } from "react"
import { observer } from "mobx-react-lite"
import { NewToDoStateContext } from "./state/NewToDoStateContext"
import { NewToDoContent } from "./NewToDoContent"
import { api } from "../../../../common/utils/HttpClient"
import { NewToDoRequest, NewToDoResponse } from "../../../../api-types"
import { AxiosResponse } from "axios"
import { eventBus, EventBusType } from "../../event-bus"

export const NewToDoContainer = observer(() => {
  const newToDoState = useContext(NewToDoStateContext)

  return (
    <NewToDoContent
      onAddClick={addToDoAsync}
    />
  )

  async function addToDoAsync() {
    await api.post<
      NewToDoResponse,
      AxiosResponse<NewToDoResponse>,
      NewToDoRequest
    >(
      `/to-dos`,
      {
        name: newToDoState.name,
      },
    )

    eventBus.publish(EventBusType.TO_DOS_CHANGED)
  }
})
