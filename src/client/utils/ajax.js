const ajax = ({ method, url, data, success, fail, complete, dataType = 'json' }) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onload = () => {
    const { status, responseText } = xhr
    let responseObj
    if (dataType === 'json') {
      responseObj = JSON.parse(responseText)
    }
    if (status.toString().startsWith('2')) {
      success(responseObj, status, xhr)
    } else {
      fail(responseObj, status, xhr)
    }
    if (complete) {
      complete(responseObj, status, xhr)
    }
  }

  xhr.send(JSON.stringify(data))
}

export default ajax
