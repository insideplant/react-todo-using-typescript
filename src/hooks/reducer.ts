
type State = {
  id: number,
  title: string,
  limitDate: string,
  detail: string
}

type Action = {
  type: 'CREATE_EVENT' | 'DELETE_EVENT' | 'DELETE_ALL_EVENTS',
  title: string,
  limitDate: string,
  detail: string
}

const events = (state: State[], action:Action): State[] => {
  switch(action.type) {
    case 'CREATE_EVENT':
      const event = {
        title: action.title,
        limitDate: action.limitDate,
        detail: action.detail
      }
      const length = state.length
      let id = length===0 ? 1 : state[length - 1].id + 1
      return [...state, {id: id, ...event}]
    case 'DELETE_EVENT':
      return []
    case 'DELETE_ALL_EVENTS':
      return []
    default:
      return state;
  }

}

export default events