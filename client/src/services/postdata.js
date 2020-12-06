export function postdata(userData){
let baseURL = "http://localhost:8000/api";

return new Promise((resolve, reject)=>{
    fetch(baseURL + '/google', {
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then((response)=>response.json())
    .then((res)=>{
        resolve(res);
    })
    .catch((error)=>{
        reject(error);
    });
});
}