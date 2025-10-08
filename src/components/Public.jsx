import { Link } from "react-router";

const Public = () => {
  const content = (
    <div className="bg-neutral-50 text-neutral-900">
      <h1 className="text-red-800 font-bold text-3xl mb-4">Library Catalog</h1>
      <p className="text-neutral-700 mb-6">
        Discover, borrow, and enjoy your favorite books.
      </p>

      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded">
        Borrow Book
      </button>

      <ul className="divide-y divide-neutral-200 mt-6">
        <li className="hover:bg-red-50 px-3 py-2 cursor-pointer">Book Title 1</li>
        <li className="hover:bg-red-50 px-3 py-2 cursor-pointer">Book Title 2</li>
      </ul>
    </div>
  );

  return content;
};

export default Public;
