import LandingPage from "./LandingPage";

export default function Layout(props:any) {
    const { children } = props
    return (
        <div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {children}
                </div>
            </div>
        </div>
    )
}
