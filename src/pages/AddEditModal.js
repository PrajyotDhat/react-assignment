import React, { useEffect, useState } from "react";
import useSelectModal from "../utils/hooks/useSelectModal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEditModal({ data }) {

	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const { closeModal } = useSelectModal();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (data) {
			setFormData({
				name: data?.data?.name || "",
				email: data?.data?.email || "",
				phone: data?.data?.phone || "",
				address: data?.data?.address || ""
			});
		}
	}, [data]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (data?.isEdit) {
				await axios.put(`${BASE_URL}users/${data?.data?.id}`, formData);
				if (data?.isProfile) navigate(-1)
			} else {
				await axios.post(`${BASE_URL}users`, formData);
			}
			closeModal();
			if (!data?.isProfile)
			data?.refetchData();

		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="w-[25rem] pb-6 pt-[2.5vw] 2xl:h-[60vh] h-[60vh] bg-[#F1F1F1] rounded-md">
			<div className="pl-5">
				<div className="flex justify-start items-center">
					<div className="bg-[#E5E5E5] h-14 w-14 rounded-full flex justify-center items-center ">
						<MdOutlineModeEditOutline
							color="#808080"
							variant="Bold"
							className="h-5 w-5 cursor-pointer" />
					</div>
				</div>
				<div className="text-lg pt-6 font-inter-bold">{data?.isEdit ? "Edit" : "Add"}User</div>
				<div className="tracking-tight text-sm pb-5 text-[#475467] font-inter-regular">
					{data?.isEdit
						? "Edit an user by changing it’s details"
						: "Add a new user by entering the details"}
				</div>
			</div>
			<div className=" w-full flex items-center justify-center">
				<form onSubmit={handleSubmit}>
					<div className="w-full">
						<label className="py-3">Name</label>
						<div className="w-full">
							<input
								type="text"
								name="name"
								value={formData?.name}
								onChange={handleInputChange}
								className="border-black rounded-md p-2"
								placeholder="Enter the Name"
							/>
						</div>
					</div>
					<div className="w-full">
						<label className="py-3">Email</label>
						<div>
							<input
								type="text"
								name="email"
								value={formData?.email}
								onChange={handleInputChange}
								className="border-black rounded-md p-2"
								placeholder="Enter the email"
							/>
						</div>
					</div>
					<div className="w-full">
						<label className="py-3">Mobile</label>
						<div>
							<input
								type="text"
								name="phone"
								value={formData?.phone}
								onChange={handleInputChange}
								className="border-black rounded-md p-2"
								placeholder="Enter the Mobile"
							/>
						</div>
					</div>
					<div className="w-full">
						<label className="py-3">Address</label>
						<div>
							<input
								type="text"
								name="address"
								value={formData?.address}
								onChange={handleInputChange}
								className="border-black rounded-md p-2"
								placeholder="Enter the Address"
							/>
						</div>
					</div>
					<div className="flex items-center justify-between pt-6">
						<button type="submit"
							className="w-[47.5%] text-white bg-black cursor-pointer p-4 flex items-center justify-center gap-x-2 rounded-md"
						>{data?.isEdit ? "Save" : "Add"}</button>
						<button type="button"
							className="w-[47.5%] text-white cursor-pointer bg-red-500 p-4 flex items-center justify-center gap-x-2 rounded-md"
							onClick={closeModal}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}