const googleAnalytics = `
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-73323770-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-73323770-1');
  </script>
`

const template = ({ body, titleTag, initialState, assets, isProd }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        ${titleTag}
        <meta name="author" content="Hanz Luo">
        <meta name="description" content="Hanz Luo personal website">
        <meta name="keywords" content="HTML,CSS,JavaScript,Hanz,Engineer">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="${assets.main.css}">
        ${isProd ? googleAnalytics : ''}
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      
      <script type="text/javascript" src="${assets.main.js}"></script>
    </html>
  `
}

module.exports = template
