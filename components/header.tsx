import React from 'react';
import Link from 'next/link';

interface IHeaderProps {
    className: string
}

const Header: React.FC<IHeaderProps> = ({className}) => {
    return (<header className={className}>
            <i></i>
            <section className="logo">
                <Link href="/" as="/">
                    <a title="Home page">
                        <img src="/img/avatar.jpg" className="rounded" />
                        <span>Ondrabus</span>
                    </a>
                </Link>
            </section>
            <input type="checkbox" />

            <div className="burger">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link href="/blog/[[...filter]]" as="/blog">
                            <a title="Blog posts">blog</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog/[[...filter]]" as="/blog/type/video">
                            <a title="Videos">videos</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" as="/about">
                            <a title="About me">about</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>);
}

export default Header