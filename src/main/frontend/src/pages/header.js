import Link from 'next/link';
// import DarkModeToggleButton from './dark-mode-toggle-button';

export default function Header()
{
    return (
            <>
                <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center bg-green-100">
                    
                    <Link href="/" legacyBehavior>
                        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        
                        <span className="ml-3 text-xl text-green-600">Calendar Recipe</span>
                        </a>
                    </Link>

                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

                    <Link href="/main" legacyBehavior>
                        <a className="mr-5 hover:text-gray-900">Home</a>
                    </Link>


                    <Link href="/share" legacyBehavior>
                        <a className="mr-5 hover:text-gray-900">Share</a>
                    </Link>

                    <Link href="/mypage" legacyBehavior>
                        <a className="mr-5 hover:text-gray-900">Mypage</a>
                    </Link>

                    <Link href="/search" legacyBehavior>
                        <a className="mr-5 hover:text-gray-900">Search</a>
                    </Link>
                    
                    </nav>
                    {/* 다크모드 토글버튼 작업*/}
                    {/* <DarkModeToggleButton/> */}
                </div>
                </header>
            </>
        
    )
}