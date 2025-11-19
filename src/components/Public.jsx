import { Link } from "react-router";
import { useState, useRef } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const Public = () => {
	const content = (
		<div>
      <div className="absolute bg-rose-200 bg-linear-to-br to-rose-100 from-gray-100 from-67% h-full w-full"></div>
			<div className="container mx-auto px-3 h-full relative">
				<div className="flex justify-center items-center flex-col pt-30 pb-16 h-full">
					<BookOpenIcon className="size-14 text-red-400 flex-grow flex-shrink-0" />
					<h1 className="text-4xl/14 text-gray-700 font-bold text-center ">
						Organize Your Personal Library,
						<br />
						Simple & Easy
					</h1>
					<p className="text-center pt-10 text-gray-400">
						Keep track of your favorite books, and find recommendations
					</p>
					<div className="pt-16">
						<a
							href="/login"
							className="flex w-full justify-center gap-2 items-center text-white py-2 px-4 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer rounded-full">
							Sign In
						</a>
            <p className="mt-4 text-center text-gray-600">Or </p>
						<div className="text-center mt-4">
							<Link
								to={{ pathname: "/signup" }}
								className="text-gray-700 font-bold hover:underline">
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return content;
};

export default Public;
