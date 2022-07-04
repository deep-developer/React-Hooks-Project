import { Container, Row, Col } from "react-bootstrap";

import {
	useState,
	useEffect
} from "react"; 

import $ from "jquery";

const Hooks = ()=>{
	const [data, setData] = useState([]);
	const [start, setStart] = useState(0);
	const getRequest = ()=>{
		$.ajax({
			type: "GET",
			url: `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=16`,
			success: function(response){
				response.map((items)=>{
					return setData((oldData)=>{
						return [
							...oldData,
							items
						]
					});
				});
			}
		});
	}

	const infiniteScroll = ()=>{
		window.onscroll = ()=>{
			const windowS = (window.innerHeight+window.scrollY);
			const bodyHeight = (document.body.offsetHeight-100);
			if(windowS >= bodyHeight)
			{
				return setStart(start+16);
			}
		}
	}

	useEffect(()=>{
		getRequest();
		infiniteScroll();
	},[start]);

	const downloadNow = (data)=>{
		const url = data.url;
		const a = document.createElement("A");
		a.href = url;
		a.download = "pic-"+data.id+".png";
		a.click();
		a.remove();
	}

	const Column = ({data})=>{
		console.log(data);
		const colDesign = (
			<>
				<div className="col-md-3 mb-2">
					<div class="card">
						<img src={data.url} alt={data.title} width="100%"/>
					</div>

					<div className="card-body border">
					<span>{data.title}</span>
					</div>
					<button className="btn btn-danger text-light" onClick={()=>downloadNow(data)}>Download</button>
				</div>
			</>
		);
		return colDesign;
	}

	const design = (
		<>
			<div className="container p-2">
				<h1 className="display-4 text-center">Paginate Image</h1>
				<hr/>
				<div className="row">
					{
						data.map((items)=>{
							return <Column data={items} key={items.id}/>
						})
					}
				</div>
			</div>
		</>
	);
	return design;
}

export default Hooks;