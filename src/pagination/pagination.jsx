 import {
	useState,
	useEffect
} from "react";

import $ from "jquery";

const Pagination = ()=>{
	const [data, setData] = useState([ ]);
	const [start, setStart] = useState(0);
	const [loader, setLoader] = useState(false);

	const getRequest = ()=>{
		$.ajax({
			type: "GET",
			url: `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=16`,
			beforeSend: function(){
				return setLoader(true);
			},
			success: function(response)
			{
				response.map((items)=>{
					return setData((oldData)=>{
						return [
							...oldData,
							items
						]
					});
				})
			},
			completed: function(){
				return setLoader(true);
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

	const Loader = ()=>{
		const loaderDesign = (
			<>
				<div class="d-flex justify-content-center">
				  <div class="spinner-border" role="status">
				    <span class="sr-only">Loading...</span>
				  </div>
				</div>
			</>
		);
		return loaderDesign;
	}

	useEffect(()=>{
		getRequest();
		infiniteScroll();
	},[start]);

	const Column = ({photos})=>{
		const colDesign = (
			<>
				<div className="col-md-3 my-2">
					<div className="card">
						<img src={photos.url} alt={photos.title}/>
						<div className="card-body">
							{photos.title}
						</div>
						<button className="btn btn-danger text-light">Download</button>
					</div>
				</div>
			</>
		);
		return colDesign;
	}

	const pagDesign = (
		<>
			<h1 className="text-center py-3">Photos Pagination</h1>
			<div className="row px-5">
				{
					data.map((items)=>{
						return <Column key={items.id} photos={items}/>
					})
				}
			</div>
			{
				loader ? <Loader /> : null
			}
		</>
	);
	return pagDesign;
}

export default Pagination;