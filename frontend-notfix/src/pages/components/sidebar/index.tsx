/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function Sidebar() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 h-full">
            <aside id="default-sidebar" className="top-0 left-0 z-40 w-100 h-auto" aria-label="Sidebar">
                <div className="h-full px-3 py-7 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="ml-3">Department</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="flex-1 ml-3 whitespace-nowrap">Employee</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}