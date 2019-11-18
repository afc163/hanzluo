/**
 * Get incoming request's real IP address
 * The real IP is set by Nginx: proxy_set_header X-Real-IP $remote_addr
 *
 * @param {Object} req Expressjs request object
 */
function getRealIp(req) {
  const realIp = req.headers['x-real-ip']
  if (!realIp) {
    console.warn('Failed to get real ip, fallback to 127.0.0.1')
    return '127.0.0.1'
  }
  return realIp
}

module.exports = {
  getRealIp,
}
