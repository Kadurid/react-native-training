import React from 'react';
import PlacesNavigator from './navigation/PlacesNavigator';
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import placeReducer from './store/reducers/places';
import { init } from './helpers/db';

init().then(() => {
  console.log('Initialized database');
}).catch(err => {
  console.log('Initializing database failed');
  console.log(err);
})

const rootReducer = combineReducers({
  places: placeReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )

}
