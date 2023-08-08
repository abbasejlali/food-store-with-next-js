import Link from "next/link";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link href="/">Food Store</Link>
        </div>
        <div className={styles.right}>
          <Link href="/menu">Menu</Link>
          <Link href="/categories">Categories</Link>
        </div>
      </header>
      <div className={styles.container}>{children}</div>
      <footer className={styles.footer}>
        Next Project | Food Store Project &copy;
        <a
          href="https://github.com/abbasejlali"
          target="_blank"
          rel="noreferrer"
        >
          Abbas Ejlali
        </a>
      </footer>
    </>
  );
}

export default Layout;
