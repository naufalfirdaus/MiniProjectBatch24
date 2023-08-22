import Image from "next/image"
import Link from "next/link"

export default function navbar() {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl px-5">
        <div className="card-body">
            <div className="navbar bg-base-100 flex justify-between">
                <Image src="/codeid_logo.png" alt={""} width={50} height={50} className=""/>
                <div className="flex gap-2">
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </label>
                    </div>
                    <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <Image src="/photo-pic.jpg" alt={""} width={50} height={50}/>
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
