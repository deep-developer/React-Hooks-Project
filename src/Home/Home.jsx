 import {useState} from "react";
import {
	demo,
	test
} from "./Home-script";

import {
	Container,
	Row,
	Col,
	Button,
	Modal,
	Form
} from "react-bootstrap";

const Home = ()=>{
	const [modalState,changemodalState] = useState(false);
	const [formData,setFormData] = useState({});
	const [setText, changeSetText] = useState(false);

	const getFormdata = (event)=>{
			const input = event.target;
			const prop = event.target.name;
			let value = "";
 			if(input.type === "file")
			{
				value = input.files[0];
			}

			else{
				value = input.value;
			}

			return setFormData((oldData)=>{
				return {
					...oldData,
					[prop]: value
				}
			});
	}

	const addUsers = (event)=>{
		event.preventDefault();
		console.log(formData); 
	}


	const design = (
		<>
			<Container>
				<h1 className="display-4 text-center mb-5">Best Practices</h1>
				<Button variant="primary" onClick={()=>changemodalState(true)}>Add user</Button>
					<h1 className="display-3">{formData.fullname}</h1>
				<Modal show={modalState}>
					<Modal.Header closeButton onHide={()=>changemodalState(false)}>
				   	 <Modal.Title>Modal title</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form onSubmit={addUsers}>
							<Form.Group className="mb-4">
								<Form.Label>Enter your name here</Form.Label>
								<Form.Control type="text" name="fullname" onChange={getFormdata}/>
							</Form.Group>

							<Form.Group className="mb-4">
								<Form.Label>Enter your email here</Form.Label>
								<Form.Control type="email" name="email" onChange={getFormdata}/>
							</Form.Group>

							<Form.Group className="mb-4">
								<Form.Label>Enter your Phone Number here</Form.Label>
								<Form.Control type="text" name="number" onChange={getFormdata}/>
							</Form.Group>

							<Form.Group className="mb-4">
								<Form.Label>Picture</Form.Label>
								<Form.Control type="file" name="file" accept="image/*" onChange={getFormdata}/>
							</Form.Group>

							<Button className="btn btn-info">Add user</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</Container>
		</>
	);
	return design;
}

export default Home;