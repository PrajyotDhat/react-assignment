import React, { useState, useEffect } from 'react'
import TableComponent from '../components/TableComponent'
import { CloudFog, InfoCircle } from 'iconsax-react';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSelectModal from '../utils/hooks/useSelectModal';

function DashBoard() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { openModal } = useSelectModal();
    const [isEdit, setIsEdit] = useState(false);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}users`);
            setData(response.data);
            setSearchData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        {
            header: "Name",
            cell: ({ row }) => {
                const { original } = row;
                return (
                    <span className="truncate font-inter-medium">
                        {original.name}
                    </span>
                );
            },
        },
        {
            header: "Email",
            cell: ({ row }) => {
                const { original } = row;
                return (
                    <span className="truncate font-inter-medium">
                        {original.email}
                    </span>
                );
            },
        },
        {
            header: "Mobile",
            cell: ({ row }) => {
                const { original } = row;
                return (
                    <span className="truncate font-inter-medium">
                        {original.phone}
                    </span>
                );
            },
        },

        {
            header: "Address",
            cell: ({ row }) => {
                const { original } = row;
                return (
                    <span className="flex gap-3 w-[100%] overflow-x-auto">
                        <span className="truncate">
                            {original.address}
                        </span>
                    </span>
                );
            },
        },
        {
            header: "Action",
            cell: ({ row }) => {
                const { original } = row;
                return (
                    <span className="flex gap-3">
                        <InfoCircle
                            color="#0d6efd"
                            variant="Bold"
                            onClick={() => navigate(`/profile-info`, { state: { areaDetails: original }, setData: setData, refetchData: fetchData })}
                            className="h-5 w-5 cursor-pointer"
                        />
                        <MdOutlineModeEditOutline
                            color="#808080"
                            variant="Bold"
                            onClick={() => {
                                openModal("AddEditModal", { data: original, isEdit: true, refetchData: fetchData })
                            }}
                            className="h-5 w-5 cursor-pointer"
                        />
                        <RiDeleteBinLine
                            color="#808080"
                            variant="Bold"
                            onClick={() => openModal("DeleteModal", { data: original, refetchData: fetchData })}
                            className="h-5 w-5 cursor-pointer"
                        />
                    </span>
                );
            },
        },
    ];

    return (
        <div className="bg-[#F5F5F5] h-full">
            <div className="space-y-3">
                <div className="px-8 pb-4 pt-8">
                    <div className="flex justify-end">
                        <button
                            className="text-white bg-red-500 rounded-md cursor-pointer 2xl:px-8 px-6 2xl:text-base text-sm p-2"
                            onClick={() => openModal("AddEditModal")}
                        >
                            Add New User
                        </button>
                    </div>
                </div>
                <div className="bg-white p-5 mx-8 my-2 pb-4">
                    <div className="flex items-center justify-between">
                        <div className="relative h-12">
                            <input
                                type="text"
                                className="w-[18.35vw] outline-focus h-full border-none rounded-xl py-1.5 px-12 text-base font-normal bg-[#F1F1F1] placeholder-black"
                                placeholder="Search by Name"
                                onChange={(e) => {
                                    if (e.target.value.length <= 0) {
                                        setData(searchData);
                                    }
                                    else {
                                        let tempSearchData=[...searchData];
                                        const searchedData = tempSearchData?.filter((employee) =>
                                            employee?.name?.toLowerCase()?.includes(e.target.value.toLowerCase())
                                        );
                                        setData(searchedData);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full mb-10 mx-8'>
                    <TableComponent
                        data={data}
                        columns={columns}
                        customeClass='pr-3 max-h-[56vh]'
                        customwidths={["w-[20%]", "w-[17.5%]", "w-[17.5%]", "w-[22.5%]", "w-[10%]", "w-[12.5%]"]}
                    />
                </div>
            </div>
        </div>
    )
}

export default DashBoard
