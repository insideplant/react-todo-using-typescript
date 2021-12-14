
type State = {
  id: number,
  title: string,
  limitDate: string,
  detail: string
}

type Action = {
  type: 'CREATE_EVENT',
  id: number,
  title: string,
  limitDate: string,
  detail: string
}

const events = (state: State[], action:any): State[] => {
  switch(action.type) {
    case 'CREATE_EVENT':
      const event = {
        title: action.title,
        limitDate: action.limit,
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