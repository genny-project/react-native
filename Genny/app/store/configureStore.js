import { AsyncStorage } from 'react-native'
import { compose, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

import { reducer } from '../redux/gennyRedux'

const store = compose(
    autoRehydrate()
)(createStore)(reducer)

persistStore(store, { storage: AsyncStorage })

export default store
