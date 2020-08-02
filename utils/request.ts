import * as https from 'https';

export default function request(url: string, options?: any): Promise<unknown> {
  return new Promise((resolve, reject) => {
    try {
      https.get(url, options, response => {
        let data = null
        response.on('data', (chunk) => {
          data += chunk.toString();
        })
        response.on('end', () => {
          resolve(data);
        })
      })
    } catch (e) {
      reject(e)
    }
  })
}
