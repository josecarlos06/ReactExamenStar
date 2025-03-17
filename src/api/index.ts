class HttpService {
   private baseUrl: string;
 
   constructor(baseUrl: string) {
     this.baseUrl = baseUrl;
   }
 
   private async request(method: string, url: string, body?: any) {
     const headers: HeadersInit = {
       'Content-Type': 'application/json',
     };
 
     const config: RequestInit = {
       method,
       headers,
       body: body ? JSON.stringify(body) : undefined,
     };
 
     const response = await fetch(`${this.baseUrl}${url}`, config);
 
     if (!response.ok) {
       throw new Error(`Error ${response.status}: ${response.statusText}`);
     }

     const data = await response.json();
     return data;
   }
 
   get(url: string) {
     return this.request('GET', url);
   }
 
   post(url: string, body: any) {
     return this.request('POST', url, body);
   }
 
   put(url: string, body: any) {
     return this.request('PUT', url, body);
   }
 
   delete(url: string) {
     return this.request('DELETE', url);
   }
 }


export const api = new HttpService('https://localhost:7292/api/');



export default HttpService;



 