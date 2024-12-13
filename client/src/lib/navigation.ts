import { NavigateFunction } from 'react-router-dom'

export let navigateTo: NavigateFunction = () => {}

export const setNavigate = (fn: NavigateFunction) => {
  navigateTo = fn
}
