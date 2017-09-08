import { AsyncStorage } from 'react-native'
import { compose, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

import { reducer } from '../redux/channel40Redux'

const store = compose(
    autoRehydrate()
)(createStore)(reducer)

persistStore(store, { storage: AsyncStorage })

export default store
