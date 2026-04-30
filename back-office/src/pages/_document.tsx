import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/asset-logo.png" />
        {/* Belt-and-suspenders polyfill for @react-aria/utils testUserAgent:
            patches both the instance and prototype so .brands is always an array */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var uad=navigator.userAgentData;if(!uad)return;try{if(Array.isArray(uad.brands))return;}catch(e){}var fix={get:function(){return[]},configurable:true};try{Object.defineProperty(uad,'brands',fix);}catch(e){try{Object.defineProperty(Object.getPrototypeOf(uad),'brands',fix);}catch(e2){}}}catch(e){}})();`
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
