import { 
	Button,
	Modal
}	from "react-bootstrap";

import {
	useState,
	useEffect
} from 'react';

import $ from "jquery";


const Http = ()=>{
	const [data, changeData] = useState([]);
	const [counter, setCounter] = useState(0);
	const [commentModal, closeCommentModal] = useState(false);
	const [totalComment, setTotalComment] = useState(0);
	const [submit, setSubmit] = useState(true);
	const fetchData = ()=>{
		$.ajax({
			type: "GET",
			url: "http://localhost:3232",
			success: function(response){

				return (
					changeData([response]),
					setTotalComment(response.totalcomment)
				);
			}
		});
	}

	const fetchDataById = ()=>{
		$.ajax({
			type: "GET",
			url: `http://localhost:3232/${counter}`,
			success: function(response)
			{
				return changeData([response]);
			},

			error: function(err){
				if(err.status === 404)
				{
					/*
					alert("Data not found !");
					return(
						setCounter(0)
					);
					*/
				}
			},
		});
	}

	useEffect(()=>{
		fetchDataById();
	},[counter]);

	const prev = ()=>{
		return (setCounter(counter-1));
	}

	const next = ()=>{
		return (setCounter(counter+1));
	}

	const insertComment = (e)=>{
	e.preventDefault();
	const form = e.target;
	const formData = new FormData(form);
	$.ajax({
		type: "POST",
		url: "http://localhost:3232",
		data: formData,
		contentType: false,
		processType: false,
		success: function(response){
			return (
				closeCommentModal(false),
				setCounter(counter.data.id)
			);
		}
	});
}

	const showModal = (isSubmit)=>{
		return (
			commentModal(true),
			setSubmit(isSubmit)
		);
	}


	const updateComments = (data)=>{
		console.log(data);
	}

	const deleteComments = (id)=>{
		$.ajax({
			type: "DELETE",
			url: `http://localhost:3232/${id}`,
			success: function(response){
				console.log(response);
			}
		});
	}

	const Card = (apidata)=>{
		const design = (
			<>
				<div className="card mb-3">
					<div className="card-header text-uppercase d-flex justify-content-between align-items-center">
						<label>{apidata.userData.title}</label>
						<div>
						<Button className="btn btn-light border text-center" onClick={()=>showModal(false)}><i className="fa fa-edit" style={{fontSize: "20px"}}></i></Button>
						<Button className="btn btn-light border text-center" onClick={()=>deleteComments(apidata.userData.id)}><i className="fa fa-trash" style={{fontSize: "20px"}}></i></Button>
						</div>
					</div>
					<div className="card-body">
						{apidata.userData.body}
					</div>
				</div>
			</>
		);
		return design;
	}

	const design = (
		<>
			<div className="container py-1">
				<div className="d-flex justify-content-between align-items-center">
					<h1 className="display-4 font-weight-bold">Comments - <small>{counter}/{totalComment}</small></h1>
					<Button className="btn btn-success text-light" onClick={()=>showModal(true)}>New Comments</Button>
				</div>

					{
						data.map((items)=>{
							return <Card userData={items} key={items.id} />
						})
					}

					<div class="d-flex justify-content-end">
						<Button className="btn btn-light border px-4 my-2" style={{marginRight: "5px"}} onClick={counter > 0 ? prev : null}>Prev</Button>
						<Button className="btn btn-light border px-4 my-2" onClick={counter < totalComment ? next : null}>Next</Button>
					</div>

					<Modal show={commentModal} onHide={()=>closeCommentModal(false)}>
						<Modal.Header closeButton>
							<h4 className="text-center mb-3">New Comments</h4>
						</Modal.Header>

						<Modal.Body>
							<form onSubmit={insertComment}>
								<label>Title</label>
								<input type="text" className="form-control mb-3"/>

								<label>Description</label>
								<textarea type="text" rows="3" className="form-control mb-2">
								</textarea>

								<Button className="btn btn-info text-light">Add Comments</Button>
							</form>
						</Modal.Body>
					</Modal>
			</div>
		</>
	);
	return design;
}

export default Http;