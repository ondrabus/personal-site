import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx){
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render(){
        return (
            <Html>
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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument