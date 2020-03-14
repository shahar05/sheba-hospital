

const THE_URL = "http://localhost:3000/";

 export default class HttpHelper {

    
    


    static get(url) {
        return new Promise((resolve, reject) => {
            var prefixUrl = THE_URL;
            $.ajax({
                type: "GET",
                url: prefixUrl + url,
                beforeSend: function (xhr) { xhr.setRequestHeader('token', localStorage.getItem('t')); },// Here Im Pulling The Item T And Addding TO the HEader Request
                success: function (respose) {
                    resolve(respose)
                },
                error: (err) => {
                    HttpHelper.errorHandle(err);
                    reject(err);
                }
            });
        })
    }
    static post(url, theData) {
        return new Promise((resolve, reject) => {
            var prefixUrl = THE_URL;
            $.ajax({
                type: "POST",
                url: prefixUrl + url,
                data: theData,
                beforeSend: function (xhr) { xhr.setRequestHeader('token', localStorage.getItem('t')); },
                success: function (respose) {
                    console.log("BolaHola");

                    resolve(respose)
                },
                error: (err) => {
                    console.log("Bozsd");
                    HttpHelper.errorHandle(err);
                    reject(err);
                }
            });
        })
    }


    static errorHandle(err) {
        if (err.status === 401) {
            window.location.href = '../'
        }
    }

}

