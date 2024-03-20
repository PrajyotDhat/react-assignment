import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import MapSearchLocation from "./MapSearchLocation";
import { ArrowLeft } from "iconsax-react";
import useSelectModal from "../utils/hooks/useSelectModal";

function ProfileInfo({ data }) {

    const { state: { areaDetails } } = useLocation();
    const { openModal } = useSelectModal();
    const navigate = useNavigate();

    return (
        <div className="px-8 pb-4 pt-8 bg-[#F5F5F5] h-full">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <ArrowLeft
                        onClick={() => navigate(- 1)}
                    />
                    <h3 className="2xl:text-[20px] text-[18px] font-futura-medium tracking-tight text-gray-900 subheading-at-zoom">
                        {areaDetails?.name}
                    </h3>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="text-white bg-black cursor-pointer p-4 w-full flex items-center justify-center gap-x-2 rounded-md"
                        onClick={() =>
                            openModal("AddEditModal", { data: areaDetails, isEdit: true, refetchData: data?.fetchData ,isProfile:true })
                        }
                    >
                        Edit
                        <MdOutlineModeEditOutline />
                    </button>
                    <button className="text-white cursor-pointer bg-red-500 p-4 w-full flex items-center justify-center gap-x-2 rounded-md"
                        onClick={() => openModal("DeleteModal", { data: areaDetails, refetchData: data?.fetchData ,isProfile:true })}
                    >
                        Delete
                        <RiDeleteBinLine />
                    </button>
                </div>
            </div>
            <hr className="mt-4 mb-4 border border-[#9F9F9F2E]" />
            <div className="flex gap-5">
                <div className="flex-col flex gap-5">
                    <div className=" bg-white border rounded-xl w-[50rem] h-[34.25rem] px-5 py-3">
                        <h1 className="text-xl font-inter-bold">
                            User Details
                        </h1>
                        <hr className="mt-2 mb-5 border border-gray-100" />
                        <div className=" ">
                            <div className="flex gap-5 mt-10">
                                <div className="text-base font-inter-medium text-[#000]">Name :</div>
                                <div className="text-base font-inter-regular font-normal text-[#474747] whitespace-nowrap overflow-y-auto">
                                    <span>
                                        {areaDetails?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-5 mt-10">
                                <div className="text-base font-inter-medium text-[#000] whitespace-nowrap">
                                    Email ID :
                                </div>
                                <div className="text-base font-normal flex gap-1 overflow-x-auto text-[#474747]">
                                    {areaDetails?.email}
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-5 mt-10">
                                    <div className="text-base font-inter-medium text-[#000]">Contact Number :</div>
                                    <div className="text-base font-normal text-[#474747] capitalize">
                                        {areaDetails?.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 mt-10">
                            <div className="text-base font-inter-medium text-[#000]">Address :</div>
                            <div className="text-base font-inter-regular text-[#474747] font-normal">
                                <div>
                                    {areaDetails?.address}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="p-3 bg-white border rounded-xl w-full h-[34.25rem]">
                        <h1 className="text-xl font-inter-bold">Map View</h1>
                        <hr className="mt-2 mb-5 border border-gray-100" />
                        <>
                            <div className="">
                                <MapSearchLocation addressDetails={areaDetails?.address} />
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProfileInfo;
