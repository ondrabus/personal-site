import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx){
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render(){

        return (
            <Html lang="en">
                <Head>
                    <meta itemProp="author" content="Ondrabus" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
                    <link href="/css/main.css" rel="stylesheet"/>
                    <link rel="icon" type="image/png"  href="/img/avatar.png" />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-126970131-1"></script>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'UA-126970131-1');`
                    }} />
                    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@kentico/kontent-smart-link@latest/dist/kontent-smart-link.styles.css"/>
                </Head>
                <body data-kontent-project-id={process.env.KONTENT_PROJECT_ID} data-kontent-language-codename="default">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument