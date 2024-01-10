import Header from './header';
import styles from './footer.module.css';
import Footer from './footer';


// 모든 레이아웃 총괄하는 껍데기
export default function Layout({ children }) {
    return (
        <div className={`${styles.container}`}>
            <header>
                <Header/>
            </header>
            <div>{children}</div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}