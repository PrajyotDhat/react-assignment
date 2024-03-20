import { useDispatch, useSelector } from "react-redux";
import { setModal, setIsModalOpen } from "./Store";
import AddEditModal from "../../pages/AddEditModal";
import DeleteModal from "../../pages/DeleteModal";

export default function useSelectModal() {
	const { modal, isModalOpen } = useSelector((state) => state.modal);
	const renderModal =
		modal.name === "AddEditModal" ? (
			<AddEditModal data={modal?.data} />
		) : modal.name === "DeleteModal" ? (
			<DeleteModal data={modal?.data} />
		) : (
			""
		);
	const dispatch = useDispatch();
	const openModal = (modalName, data = null) => dispatch(setModal({ name: modalName, data }));

	const closeModal = () => {
		dispatch(setModal(""));
		dispatch(setIsModalOpen(false));
	};

	return { dispatch, setModal, setIsModalOpen, renderModal, isModalOpen, openModal, closeModal };
}
