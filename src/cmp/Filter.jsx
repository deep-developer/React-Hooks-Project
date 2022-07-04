import {
	useDispatch,
	useSelector
} from "react-redux";

import { 
	getAllUser,
	userFilter
} from '../Redux/Action/user.action';

import {
	useEffect,
	useRef
} from "react";


const Filter = ()=>{
	const dispatch = useDispatch();
	const response = useSelector(response=>response);
	useEffect(()=>{
		dispatch(getAllUser())
	},[dispatch]);

	const selectedOption = useRef();


	const Tr = ({item})=>{
		const trDesign = (
			<tr>
				<td>{item.id}</td>
				<td>{item.email}</td>
				<td>{item.mobile}</td>
			</tr>
		);
		return trDesign;
	}

	const design = (
		<>
			<div className="container py-5">
				<h2 className="text-center py-2">Filter</h2>
				<div className="row">
					<div className="col-md-2">
						<select className="p-2 w-100" ref={selectedOption}>
							<option value="FILTER_BY_EMAIL">Filter by Email</option>
							<option value="FILTER_BY_MOBILE">Filter by Mobile</option>
						</select>
					</div>

					<div className="col-md-10">
						<input 
						className="p-2 w-100" 
						placeholder="search"
						onChange={(e)=>dispatch(userFilter(selectedOption,e))}
						 />
					</div>
				</div>

				<table className="table table-bordered my-4">
					<thead>
						<tr>
							<th width="80">S/No</th>
							<th>Email Id</th>
							<th>Mobile No</th>
						</tr>
					</thead>
					<tbody>
						{
							response && response.data.map(item=><Tr key={item.id} item={item} />)
						}
					</tbody>
				</table>
			</div>
		</>
	);
	return design;
}

export default Filter;