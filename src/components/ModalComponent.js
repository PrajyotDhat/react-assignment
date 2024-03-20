import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useSelectModal from "../utils/hooks/useSelectModal";
// import crossIcon from "../../assets/icons/cross.png";
// import crossColorIcon from "../../assets/icons/color-cross.png"

export default function ModalComponent({ children }) {

	const { isModalOpen, closeModal } = useSelectModal();
	let hideCloseIcon = children?.props?.data?.hideCloseArrow
		? children?.props?.data?.hideCloseArrow
		: false;
	let customeClassForModal = children?.props?.data?.customeClassForModal;
	let positionOfCross = children?.props?.data?.postionOfCross;

	return (
		<Transition appear show={isModalOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={() => ""}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-25" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto sm:p-2">
					<div className="flex min-h-full items-center justify-center text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className={`popup transform rounded-[20px] bg-white text-left align-middle shadow-xl transition-all relative modal-rounded ${customeClassForModal}`}>
								{!hideCloseIcon && (
									<button
										className={`normal-12 absolute z-20 text-black flex items-center gap-3  whitespace-nowrap rounded-lg focus-visible:outline-none sm:h-8 cursor-pointer close-cross-btn ${positionOfCross ? 'top-3 -right-2 color-close-btn' : 'top-6 right-4'}`}
										onClick={closeModal}
									>
									{/* {
										positionOfCross ? <img className="w-20 h-20 object-contain" src={crossColorIcon} /> : <img src={crossIcon} alt="" />
									} */}
									</button>
								)}
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
