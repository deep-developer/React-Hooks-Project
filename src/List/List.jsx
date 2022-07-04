import {
	Button,
	Card
} from "react-bootstrap";

import {
	useState,
	useEffect
} from "react";

import $ from "jquery";

const List = ()=>{
	const [data, changeData] = useState([]);
	const fetchData = ()=>{
		$.ajax({
			type: "GET",
			url: "https://jsonplaceholder.typicode.com/posts",
			success : function(response){
				return (
					changeData([response])
				);
			}
		});
	}

	useEffect(()=>{
		fetchData();
	},[]);


	const Card = (apidata)=>{
		const cardDesign = (
			<>
				<div className="card mb-3">
					<div className="card-header">{apidata.userData.title}</div>
					<div className="card-body">
						{apidata.userData.body}
					</div>
				</div>
			</>
		);
		return cardDesign;
	}

	const listDesign = (
		<>
			<div className="container py-2">
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="display-4">Albums</h1>
					<Button variant="danger">New Album</Button>
				</div>

					{
						data.map((items)=>{
							return <Card userData={items} key={items.id} />
						})
					}
			</div>
		</>
	);
	return listDesign;
}

export default List;