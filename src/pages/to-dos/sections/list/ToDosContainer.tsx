import { useContext, useEffect } from "react"
import { ToDosStateContext } from "./state/ToDosStateContext"
import { observer } from "mobx-react-lite"
import { ToDosContent } from "./ToDosContent"
import { api } from "../../../../common/utils/HttpClient"
import { CompleteToDosRequest, ToDosResponse } from "../../../../api-types"
import { AxiosResponse } from "axios"

export const ToDosContainer = observer(({
  onToDosCompleted,
}: {
  onToDosCompleted: () => unknown,
}) => {
  const toDosState = useContext(ToDosStateContext)

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
    toDosState.needToReloadToDos,
  ])

  return (
    <ToDosContent
      onCompleteClick={onCompleteSelectedToDos}
      onDeleteClick={onDeleteToDos}
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

    onToDosCompleted()
  }

  async function onDeleteToDos(id: number) {
    await api.delete<
      void,
      AxiosResponse<void>
    >(
      `/to-dos?toDoId=${id}`,
    )
  }
})
