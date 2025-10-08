const DashHeader = () => {

    const content = (
        <header className="h-16 col-span-10 col-start-3 row-start-1 flex justify-end shadow-lg pr-4 bg-white">
            <div className="flex items-center gap-2 p-3">
                <span className="inline-block size-10 rounded-full bg-gray-300"></span>
                <span>John</span>
            </div>
        </header>
    );
    return content; 
}

export default DashHeader;