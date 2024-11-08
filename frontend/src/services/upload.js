import axios from "axios";


const url = import.meta.env.VITE_API_URL;

export const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
    }
    return axios.post(url+'/api/user/media/upload', formData, config)
}