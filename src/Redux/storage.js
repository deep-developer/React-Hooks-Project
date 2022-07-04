import userReducer from './Reducer/user.reducer';

import {
	createStore
} from "redux";

const storage = createStore(userReducer);

export default storage;