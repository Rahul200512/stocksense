import Header from "@/components/Header";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if(!session?.user) redirect('/sign-in');

    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }

    return (
        <main className="min-h-screen text-gray-400 flex flex-col">
            <Header user={user} />

            <div className="container py-10 flex-1">
                {children}
            </div>

            <footer className="container py-6 text-sm text-gray-500 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>© {new Date().getFullYear()} StockSense — AI Stock Tracker</span>
                <span>
                    Built by{' '}
                    <a
                        href="https://www.linkedin.com/in/rahul-reddy-avula"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:underline"
                    >
                        Rahul Reddy Avula
                    </a>
                </span>
            </footer>
        </main>
    )
}
export default Layout
