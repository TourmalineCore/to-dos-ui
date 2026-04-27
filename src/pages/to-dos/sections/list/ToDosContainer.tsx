import { useContext, useEffect, useState } from "react"
import { ToDosStateContext } from "./state/ToDosStateContext"
import { observer } from "mobx-react-lite"
import { ToDosContent } from "./ToDosContent"
import { api } from "../../../../common/utils/HttpClient"
import { CompleteToDosRequest, ToDosResponse } from "../../../../api-types"
import { AxiosResponse } from "axios"
import { eventBus, EventBusType } from "../../event-bus"

export const ToDosContainer = observer(() => {
  const toDosState = useContext(ToDosStateContext)

  const [
    needToReloadToDos,
    setNeedToReloadToDos,
  ] = useState(false)

  useEffect(() => {
    const unsubscribeToDosChanged = eventBus.subscribe(EventBusType.TO_DOS_CHANGED, () => {
      setNeedToReloadToDos(!needToReloadToDos)
    })

    return () => {
      unsubscribeToDosChanged()
    }
  }, [
    needToReloadToDos,
  ])

  useEffect(() => {
    async function loadToDosAsync() {
      const {
        data: {
          toDos,
        },
      } = await api.get<ToDosResponse>(`/to-dos`)

      toDosState.initialize({
        toDos,
      })
    }

    loadToDosAsync()
  }, [
    needToReloadToDos,
  ])

  return (
    <ToDosContent
      onCompleteClick={onCompleteSelectedToDos}
    />
  )

  async function onCompleteSelectedToDos() {
    await api.post<
      void,
      AxiosResponse<void>,
      CompleteToDosRequest
    >(
      `/to-dos/complete`,
      {
        toDoIds: toDosState.selectedToDoIds,
      },
    )

    toDosState.clearSelection()

    setNeedToReloadToDos(!needToReloadToDos)
  }
})
