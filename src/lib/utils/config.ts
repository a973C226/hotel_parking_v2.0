function getBaseURL() {
    if (typeof window !== 'undefined') {
      return ''
    }
    if (process.env.NODE_ENV !== 'development') {
      return process.env.HOST
    }
    return 'http://localhost:3000'
}

export {  getBaseURL } 