import { JSX, useReducer, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { categoryReducer } from "@/reducers/categoryReducer";
import Loading from "@/components/partials/Loading";
import AssetEdit from "@/assets/svg/asset-edit.svg";
import AssetDelete from "@/assets/svg/asset-delete.svg";
import ApiError from "@/errors/ApiError";
import Modal from "@/components/partials/Modal";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Category } from "@/@types";
import CategoryModule from "@/modules/CategoryModule";
import { useCategory } from "@/hooks/useCategory";

export default function Categories(): JSX.Element {
	// states
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [categorytId, setCategorytId] = useState<number>(0);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	// router
	const router = useRouter();

	// fetch categoriy
	const { categories, isCategoryLoading } = useCategory();

	// reducers ONPROGRESS
	const [state, dispatch] = useReducer(
		categoryReducer,
		{} as DataWithPagination<Category>
	);

	// handle delete caategory
	const handleDeleteCategory = async (id: number): Promise<void> => {
		setIsDeleting(true);
		try {
			await new CategoryModule().destroy(id);
			// toast
			toast("Category Deleted", {
				icon: "✅",
				style: {
					backgroundColor: "#F4B202",
					color: "#ffffff",
					paddingBlock: 12,
				},
			});
		} catch (error) {
			const err = error as ApiError;
			alert(err.message);
		} finally {
			setIsOpen(false);
			setIsDeleting(false);
			router.reload();
		}
	};

	return (
		<>
			<Head>
				<title>SPAS | Categories</title>
			</Head>

			<main>
				<header className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
					<div>
						<h2 className="mb-4 text-4xl">Categories</h2>

						<p>You can add, update and delete categorie here</p>
					</div>

					<Link
						href={`/categories/create`}
						className="bg-secondary hover:bg-primary rounded-lg text-white p-3.5"
					>
						Add New
					</Link>
				</header>

				{/* TODO */}
				<section>
					{isCategoryLoading && !categories?.data && <Loading />}

					<div className="grid gap-4 md:gap-8">
						{categories?.data?.length === 0 && (
							<div>
								<p>Category is empty</p>
							</div>
						)}

						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500">
								<thead className="lg:text-base text-center text-white uppercase bg-secondary">
									<tr>
										<th
											scope="col"
											className="w-1/2 px-6 py-3"
										>
											Name
										</th>
										<th scope="col" className="px-6 py-3">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{categories?.data.map(
										(category: Category, index: number) => (
											<tr className="bg-white text-md text-black hover:bg-gray-50 hover:text-white dark:hover:bg-gray-600 h-max">
												<td className="text-center p-6">
													{category.name}
												</td>
												<td>
													<div className="flex gap-x-2 p-2 justify-center">
														<Link
															href={`/categories/edit/${category.id}`}
														>
															<Image
																className="w-10 cursor-pointer rounded-lg bg-primary p-2.5"
																src={AssetEdit}
																alt="Asset View"
															/>
														</Link>

														<Image
															onClick={() => {
																setCategorytId(
																	category.id
																);
																setIsOpen(true);
															}}
															className="w-10 cursor-pointer rounded-lg bg-red-600 p-2.5"
															src={AssetDelete}
															alt="Asset View"
														/>
													</div>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>
				</section>

				<section>
					<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
						<div
							className={`${
								false ? "pointer-events-none" : ""
							} relative flex flex-col items-center gap-y-8 p-8 text-center font-bold text-white`}
						>
							<p className="text-xl">
								Are you sure you want to delete <br /> this
								categories?
							</p>
							<div className="flex gap-x-4">
								<button
									onClick={() =>
										handleDeleteCategory(categorytId)
									}
									className="btn bg-secondary px-8"
								>
									Yes
								</button>

								<button
									onClick={() => setIsOpen(false)}
									className="btn"
								>
									Cancel
								</button>
							</div>
							{/* {isDeleting && (
                        <div className='bg-white/60 flex items-center absolute inset-0 z-40'>
                            <Image
                                className='mx-auto w-16'
                                src={Spin}
                                alt='loading'
                            />
                        </div>
                    )} */}
						</div>
					</Modal>
				</section>
			</main>
		</>
	);
}
