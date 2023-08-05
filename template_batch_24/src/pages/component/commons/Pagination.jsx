import React from 'react';

export default function Pagination({ items, pageSize, currentPage, onPageChange }){
    const pagesCount = Math.ceil(items / pageSize);

    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    return (
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing 
                <span className="font-semibold text-gray-900 dark:text-white"> 1-{pageSize}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pages.length} </span>Data</span>
            <ul className="inline-flex -space-x-px text-sm h-8">
                {/* <li>
                    <a className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500  border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage == 1 ? 'bg-gray-100' : 'bg-white'}`} 
                    onClick={() => {
                        currentPage == 1 ? false : onPageChange((prev) => prev - 1);
                    }} >Previous</a>
                </li> */}
                {pages.map(page => 
                    <li key={page}>
                        <a onClick={() => onPageChange(page)} className={`flex items-center justify-center px-3 h-8 border border-gray-300 ${currentPage == page ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'}`}>{page}</a>
                    </li>
                )}
                {/* <li>
                    <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                </li> */}
            </ul> 
        </nav>
    )
}