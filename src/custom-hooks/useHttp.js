import $ from "jquery";
import {
	useState,
	useEffect
} from "react";

const useHttp = (request)=>{
	use [response, setResponse] = useState([]);
	useEffect(()=>{
		request.success = (r)
		{
			return setResponse(r);
		}
		$.ajax(request);
	},[]);
}

export default useHttp;