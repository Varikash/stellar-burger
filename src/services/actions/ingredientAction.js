export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const passIngredient = (item) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL,
    ingredient: item,
  })
}

export const resetData = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
    ingredient: null
  })
}
