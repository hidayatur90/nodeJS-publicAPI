const axios = require("axios");
const fs = require("fs").promises;

const API_BASE_URL = "https://api.publicapis.org/entries?category=Weather";

async function get_api_list() {
    try {
        let response = await axios.get(API_BASE_URL);

        get_api = response.data["entries"];
        console.log("Berhasil mendapatkan data dari API");

        let api_list = "";
        get_api.forEach(get_api => {
            let API_NAME = get_api["API"];
            let API_DESC = get_api["Description"];
            let API_LINK = get_api["Link"];

            api_list += `Nama : ${API_NAME}, Deskripsi : ${API_DESC}, Link : ${API_LINK}\n`;
        });

        await fs.writeFile("API List(Async-await).csv", api_list);
        console.log("Berhasil memasukkan data ke file CSV");
    } catch (error) {   
        console.error(`Gagal ambil data dari API : ${error.message}`);
    }
}
get_api_list();