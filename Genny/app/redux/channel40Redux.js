import { REHYDRATE } from 'redux-persist/constants'

const types = {
}

const initialState = {
}

export const actionCreators = {
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action
    const { tasks } = state

    switch (type) {
        case "persist/REHYDRATE": {
            return payload
        }
        default: {
            return state
        }
    }
}
