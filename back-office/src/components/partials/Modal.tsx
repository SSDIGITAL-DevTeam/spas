import { Dispatch, JSX, ReactNode, SetStateAction } from "react";

type Props = {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Modal(props: Props): JSX.Element {
	const { children, isOpen, setIsOpen } = props;

	return (
		<>
			<div
				className={`absolute bottom-0 ${
					isOpen
						? "pointer-events-auto z-40"
						: "pointer-events-none invisible z-20"
				}`}
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div
					onClick={() => {
						setIsOpen(false);
					}}
					className={`fixed inset-0 bg-dark/50 backdrop-blur transition-opacity ${
						isOpen
							? "opacity-100 duration-300 ease-out"
							: "opacity-0 duration-200 ease-in"
					}`}
				></div>

				<div className="pointer-events-none fixed inset-0 z-10">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div
							className={`pointer-events-auto relative z-20 w-full transform overflow-hidden rounded-lg bg-primary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${
								isOpen
									? "translate-y-0 opacity-100 duration-300 ease-out sm:scale-100"
									: "translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95"
							}`}
						>
							<div>{children}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
