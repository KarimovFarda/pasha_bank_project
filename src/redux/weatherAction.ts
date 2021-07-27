import { WEATHER_ACTIONS } from "./constants"

export const getTemp = () => (dispatch: any) =>
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=40.4093&lon=49.8671&appid=3567fe94af59f4eb83cd9d03c1b384a8`)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: WEATHER_ACTIONS.GET_TEMPS,
        payload: response.data
      })
    })



