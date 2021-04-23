export default function Footer (){
    return (<footer>
        <h2>Get in touch</h2>
        <ul>
            <li><a className="fcc" href="https://www.freecodecamp.org/news/author/ondrej/" title="FreeCodeCamp profile"><img src="/img/logos/fcc.svg" alt="freeCodeCamp" /></a></li>
            <li><a className="youtube" href="https://youtube.com/c/ondrabus" title="YouTube profile"><img src="/img/logos/youtube.svg" alt="YouTube" /></a></li>
            <li><a className="twitter" href="https://twitter.com/ondrabus" title="Twitter profile"><img src="/img/logos/twitter.svg" alt="Twitter" /></a></li>
            <li><a className="medium" href="https://medium.com/@o.polesny" title="Medium profile"><img src="/img/logos/medium.svg" alt="Medium" /></a></li>
            <li><a className="linkedin" href="https://www.linkedin.com/in/ondrej-polesny/" title="LinkedIn profile"><img src="/img/logos/linkedin.svg" alt="LinkedIn" /></a></li>
            <li><a className="github" href="https://github.com/ondrabus" title="GitHub profile"><img src="/img/logos/github.svg" alt="GitHub" /></a></li>
        </ul>
        <p>&copy; {new Date().getFullYear()} Ondrej Polesny</p>
    </footer>);
}