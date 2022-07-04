import userData from '../../data';
import {
	GET_ALL_USER,
	FILTER_BY_EMAIL,
	FILTER_BY_MOBILE
} from '../State/user.state';

const defaultValue = {
	data: []
}

let filtered = "";
let keyword = "";

const userReducer = (state=defaultValue, action)=>{
	if(action.type === GET_ALL_USER)
	{
		return {
			...state,
			data: userData
		}
	}

	if(action.type === FILTER_BY_EMAIL)
	{
		keyword = action.keyword;
		filtered = userData.filter(item=>item.email.indexOf(keyword) !== -1);
		return {
			...state,
			data : filtered
		}
	}

	if(action.type === FILTER_BY_MOBILE)
	{
		keyword = action.keyword;
		filtered = userData.filter(item=>item.mobile.toString().indexOf(keyword) !== -1);
		return {
			...state,
			data : filtered
		}
	}
}

export default userReducer;