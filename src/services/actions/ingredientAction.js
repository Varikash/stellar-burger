export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const passIngredient = (item) => ({
    type: OPEN_MODAL,
    ingredient: item,
})

export const resetData = () => ({
    type: CLOSE_MODAL,
    ingredient: null
})
