import api from "./api";

export async function downloadExcel(){
    window.open("http://localhost:3000/api/reportes/excel","_blank");
}

export async function downloadPDF(){
    window.open("http://localhost:3000/api/reportes/pdf","_blank")
}