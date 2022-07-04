import "./Comment.css";

import { useState } from "react";

import {
	Container,
	Button,
	Form,
	Modal,
	Table
} from "react-bootstrap"; 

const Comment = ()=>{
	const [showModal,changeShowModal] = useState(false);
	const [formState,changeFormState] = useState([]);
	const [submit, changeSubmit] = useState(true);
	const [input,setInput] = useState({
		fullname: "",
		email: "",
		phone: ""
	});

	const allData = {};

	const addComment = (e)=>{
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		for(let data of formData.entries())
		{
			let key = data[0];
			let value = data[1];
			if(typeof value === "object")
			{
				value = URL.createObjectURL(value);
			}
			allData[key] = value;
		}
	}

	const insertData = (e)=>{
		addComment(e);
		return (
			changeFormState((oldData)=>{
				return [
					...oldData,
					allData
				]
			}),
			changeShowModal(false),
			setInput({
				fullname: "",
				email: "",
				phone: ""
			})
		);
	}

	const updateData = (e)=>{
		addComment(e);
		console.log(allData);
		return (
			changeShowModal(false)
		);
	}

	const deleteUser = (userIndex)=>{
		let tmp = [...formState];
		tmp.splice(userIndex,1);
		return changeFormState(tmp);
	}

	const editUser = (data)=>{
		console.log(data);
		return (
			setInput(data),
			changeSubmit(false),
			changeShowModal(true)
		);
	}

	const closeModal = ()=>{
		return (
			changeSubmit(true),
			changeShowModal(false)
		);
	}

	const Tr = ({userData})=>{
		return (
				   	<>
				    	<tr>
				    		<td>{userData.index+1}</td>
				    		<td><img alt="avatar" src={userData.picture} width="50" height="50" className="rounded-circle"/></td>
				    		<td>{userData.fullname}</td>
				    		<td>{userData.email}</td>
				    		<td>{userData.phone}</td>
				    		<td>{new Date().toLocaleDateString()}</td>
				    		<td>
				    			<Button style={{marginRight: "8px"}} className="badge" variant="info" onClick={()=>editUser(userData)}><i className="fa fa-edit"></i>Edit</Button>
				    			<Button className="delete" onClick={()=>deleteUser(userData.index)} variant="danger"><i className="fa fa-trash"></i>Delete</Button>
				    		</td>
				    	</tr>
				    </>
			   );
	}


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
			<Container className="py-4">
				<h1 className="text-center display-4">User Comments</h1>
				<Button className="rounded-circle add-btn" onClick={()=>changeShowModal(true)}><i className="fa fa-plus"></i></Button>

				<Modal show={showModal}>
					<Modal.Header closeButton onHide={closeModal}>
						<Modal.Title>New user</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form onSubmit={submit ? insertData : updateData}>
							<Form.Group className="mb-2">
		 						<Form.Label>Fullname</Form.Label>
								<Form.Control type="text" name="fullname" value={input.fullname} onChange={setInputValue} />
							</Form.Group>

							<Form.Group className="mb-2">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" name="email" value={input.email} onChange={setInputValue} />
							</Form.Group>

							<Form.Group className="mb-2">
								<Form.Label>Phone</Form.Label>
								<Form.Control type="number" name="phone" value={input.phone} onChange={setInputValue} />
							</Form.Group>

							<Form.Group className="mb-2">
								<Form.Label>Picture</Form.Label>
								<Form.Control type="file" name="picture" accept="images/*"/>
							</Form.Group>
							{
								submit ? <Button type="submit" className="btn-danger mb-2">Add</Button> : <Button type="submit" className="btn-success mb-2">Save</Button>
							}
						</Form>
					</Modal.Body>
				</Modal>

				<Table striped bordered hover>
				  <thead>
				    <tr>
				      <th>S/No</th>
				      <th>Picture</th>
				      <th>Fullname</th>
				      <th>Email</th>
				      <th>Mobile</th>
				      <th>Date</th>
				      <th>Action</th>
				    </tr>
				  </thead>
				  <tbody>
				    {
				    	formState.map((item,index)=>{
				    		item["index"] = index;
				    		return <Tr userData={item} key={index} />
				    	})
				    }
				  </tbody>
				</Table>
			</Container>
		</>
	);
	return design;
}

export default Comment;