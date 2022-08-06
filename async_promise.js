const axios = require("axios");
const fs = require("fs").promises;

const API_BASE_URL = "https://api.publicapis.org/entries?category=Weather";

axios.get(API_BASE_URL)
    .then((response) => {
        console.log("Berhasil mendapatkan data dari API");

        get_api = response.data["entries"];

        let api_list = "";

        get_api.forEach(get_api => {
            let API_NAME = get_api["API"];
            let API_DESC = get_api["Description"];
            let API_LINK = get_api["Link"];

            api_list += `Nama : ${API_NAME}, Deskripsi : ${API_DESC}, Link : ${API_LINK}\n`;
        });

        return fs.writeFile("API List(Promise).csv", api_list);
    })
    .then(() => {
        console.log("Berhasil memasukkan data ke file CSV");
    })
    .catch((error) => {
        console.error(`Gagal ambil data dari API : ${error.message}`);
    })
