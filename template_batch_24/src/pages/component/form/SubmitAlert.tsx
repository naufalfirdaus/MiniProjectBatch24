import { Dispatch, Fragment, MouseEventHandler, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";

type AlertProps = {
  alert: {
    open: boolean,
    status: string
  },
  setAlert: Dispatch<SetStateAction<{
    open: boolean;
    status: string;
  }>>,
  title: string,
  description: string,
  onClose: (value: boolean) => void,
  onClickOk: MouseEventHandler<HTMLButtonElement> | undefined,
}

export default function SubmitAlert({ alert, setAlert, title, description, onClose, onClickOk }: AlertProps) {
  return (
    <Transition appear show={alert.open} as={Fragment}>
        <Dialog as="div" onClose={onClose} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm text-gray-600">
                    {description}
                  </Dialog.Description>

                  <div className="mt-4">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus-visible:ring-2 focus:outline-none focus-visible:ring-offset-2 ${alert.status === "failed" ? "bg-red-200 text-red-950 hover:bg-red-300 focus-visible:ring-red-500" : " bg-green-200 text-green-950 hover:bg-green-300 focus-visible:ring-green-500"}`}
                      onClick={onClickOk}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}