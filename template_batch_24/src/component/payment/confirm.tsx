import React from 'react';

export default function Confirm({ toggleModal, transferAction, transferPayload }: any) {

    const handleConfirm = () => {
        // Call the transfer action and pass the payload
        transferAction(transferPayload);
        toggleModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-700">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg dark:bg-gray-700">
                <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={toggleModal}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to transfer?</h3>
                    <button
                        type="button"
                        className="text-red-500 bg-white hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-200 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-red-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                        data-modal-hide="popup-modal"
                        onClick={toggleModal}
                    >
                        No, cancel
                    </button>
                    <button
                        type="button"
                        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-2"
                        data-modal-hide="popup-modal"
                        onClick={handleConfirm}
                    >
                        Yes, sure
                    </button>
                </div>
            </div>
        </div>
    );
}
