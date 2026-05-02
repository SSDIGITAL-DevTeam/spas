import { Html, Head, Main, NextScript } from 'next/document'

const normalizeUserAgentDataScript = `
(function () {
  var nav = window.navigator;
  if (!nav || !nav.userAgentData) return;

  function hasBrands(userAgentData) {
    try {
      return Array.isArray(userAgentData.brands);
    } catch (error) {
      return false;
    }
  }

  var userAgentData = nav.userAgentData;
  if (hasBrands(userAgentData)) return;

  try {
    Object.defineProperty(userAgentData, "brands", {
      configurable: true,
      value: []
    });
    if (hasBrands(userAgentData)) return;
  } catch (error) {}

  try {
    var proto = Object.getPrototypeOf(userAgentData);
    if (proto) {
      Object.defineProperty(proto, "brands", {
        configurable: true,
        get: function () {
          return [];
        }
      });
    }
    if (hasBrands(userAgentData)) return;
  } catch (error) {}

  try {
    Object.defineProperty(nav, "userAgentData", {
      configurable: true,
      value: Object.assign({}, userAgentData, { brands: [] })
    });
  } catch (error) {}
})();
`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: normalizeUserAgentDataScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
