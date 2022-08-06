// Import Module yang dibutuhkan
const request = require("request");
const fs = require("fs");

// Variable base URL untuk public API (link)
const API_BASE_URL = "https://api.publicapis.org/entries?category=Weather";

// Callback Function
request(API_BASE_URL, (error, response, body) => {
    // Error Check
    if(error) {
        console.error(`Gagal akses API ${error.message}`);
    }

    // Status Code Check
    if(response.statusCode != 200){
        console.error(`Gagal akses API ${error.statusCode}`);
    }

    // Jika tidak ada error, maka data akan diambil dan dimasukkan ke dalam body dan ubah ke JSON
    console.log("Proses Ambil data dari API");
    get_api = JSON.parse(body)["entries"];

    // Variable api_list untuk menampung data yang akan dimasukkan ke dalam file CSV
    let api_list = "";
    get_api.forEach(get_api => {
        // GET dan mesasukkan data ke dalam file CSV
        let API_NAME = get_api["API"];
        let API_DESC = get_api["Description"];
        let API_LINK = get_api["Link"];

        api_list += `Nama : ${API_NAME}, Deskripsi : ${API_DESC}, Link : ${API_LINK}\n`;
    });

    // Re-write (menuliskan ulang) data ke dalam file CSV
    fs.writeFile("API List(callback).csv", api_list, (error) => {
        if(error) {
            console.error(`Gagal memasukkan data ke CSV : ${error.message}`);
            return;
        }
        console.log("Berhasil");
    });
});