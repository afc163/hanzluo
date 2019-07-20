const template = ({ body, titleTag, initialState, assets }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        ${titleTag}
        <meta name="author" content="Hanz Luo">
        <meta name="description" content="Hanz Luo personal website">
        <meta name="keywords" content="HTML,CSS,JavaScript,Hanz,Engineer">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="${assets.main.css}">
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      
      <script src="${assets.main.js}"></script>
    </html>
  `
}

module.exports = template
