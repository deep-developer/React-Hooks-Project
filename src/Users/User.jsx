import './User.css';
import { useState } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Modal,
	Form,
	Card,
	Table,
	thead,
	tr,
	th
} from "react-bootstrap";

const User = ()=>{
	const [modalState, changeModalState] = useState(false);
	const [formState, changeFormState] = useState([]);
	const [input,setInput] = useState({
		fullname: '',
		email: '',
		phone: ''
	});

	const addData = (event)=>{
		event.preventDefault();
		const form = event.target;
		const allData = {};
		const formData = new FormData(form);
		for(let data of formData.entries())
		{
			let key = data[0];
			let value = data[1];
			
			allData[key] = value;
		}
		return (changeFormState((oldData)=>{
			return [
				...oldData,
				allData
			]
		}),

			changeModalState(false)
		)
	};

	const setInputValue = (e)=>{
		const input = e.target;
		const value = input.value;
		const key = input.name;
		return setInput((oldData)=>{
			return {
				...oldData,
				[key]: value
			}
		}); 
	}



	const design = (
		<>
			<Container>
				<h1 className="display-4 text-center my-3">Users</h1>
				<Button className="btn btn-info add-btn" onClick={()=>changeModalState(true)}><h1 className="text-light">+</h1></Button>
				<Modal show={modalState}>
				   <Modal.Header closeButton onClick={()=>changeModalState(false)}>
				  		<Modal.Title>New User</Modal.Title>
				   </Modal.Header>

				   <Modal.Body>
				   	  <Form onSubmit={addData}>
				   		 <Form.Group>
				   		 	<Form.Label>Fullname</Form.Label>
				   		 	<Form.Control type="text" name="fullname" value={input.fullname} onChange={setInputValue}/>
				   		 </Form.Group>

				   		  <Form.Group>
				   		 	<Form.Label>Email</Form.Label>
				   		 	<Form.Control type="email" name="email" value={input.email} onChange={setInputValue}/>
				   		 </Form.Group>

				   		  <Form.Group>
				   		 	<Form.Label>Phone No</Form.Label>
				   		 	<Form.Control type="number" name="phone" value={input.phone} onChange={setInputValue}/>
				   		 </Form.Group>

				   		 <Form.Group>
				   		 	<Form.Label>Picture</Form.Label>
				   		 	<Form.Control type="file" name="file" accept="images/*" /> 
				   		 </Form.Group>

				   		 <Button className="btn btn-danger text-light mt-2">Submit</Button>
				   	  </Form>

				   	  <h1>{formState.fullname}</h1>
				   </Modal.Body>
				</Modal>

				<Table striped bordered hover>
				  <thead>
				    <tr>
				      <th>Sl no</th>
				      <th>Fullname</th>
				      <th>Email</th>
				      <th>Phone Number</th>
				      <th>Picture</th>
				      <th>Date</th>
				    </tr>
				  </thead>
				</Table>
			</Container>
		</>
	);
	return design;
}

export default User;