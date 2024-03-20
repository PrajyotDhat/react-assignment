import React from "react";
import useSelectModal from "../utils/hooks/useSelectModal";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteModal({ data }) {

    const { closeModal } = useSelectModal();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const handleDelete = async () => {
            try {
                await axios.delete(`${BASE_URL}users/${data?.data?.id}`);
                closeModal();
                if (data?.isProfile) navigate(-1)
                data?.refetchData();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
    };

    return (
        <div>
            <div>
                <div className="w-[29rem] p-6 px-8 bg-[#FFFFFF] rounded-xl">
                    <div className="flex items-center justify-center">
                        <div className=" bg-[#E5E5E5] h-14 w-14 rounded-full flex justify-center items-center ">
                            <RiDeleteBinLine
                                color="#808080"
                                variant="Bold"
                                className="h-5 w-5 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex font-inter-medium justify-center pt-4 text-lg text-center">
                        Are you sure you want to delete<br />
                        “{data?.data?.name}”
                    </div>
                    <div className="pb-6 pt-0.5 text-center">
                        <span className="text-[#87898E] text-center text-sm">This action can’t be undone</span>
                    </div>
                    <div className="flex justify-between ">
                        <button
                            className="w-[47.5%] text-white bg-black cursor-pointer p-4 flex items-center justify-center gap-x-2 rounded-md"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="w-[47.5%] text-white cursor-pointer bg-red-500 p-4 flex items-center justify-center gap-x-2 rounded-md"
                            type="submit"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal