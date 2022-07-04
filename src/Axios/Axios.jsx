import axios from "axios";

const Axios = ()=>{

	const getRequest = async ()=>{
		try {
			const {data} = await axios.get("https://jsonplaceholder.typicode.com/post");
			console.log(data);
		}

		catch (err){
			console.log(err);
		}	
	}


	const design = (
		<>
			<h1>welcome to Axios</h1>
			<button onClick={getRequest}>Test</button>
		</>
	);
	return design;
}

export default Axios;