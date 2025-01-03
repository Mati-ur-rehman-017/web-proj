import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  // data.append("upload_preset", "marketplace");
  data.append("upload_preset", "mati_web");

  try {
    const res = await axios.post(
      // "https://api.cloudinary.com/v1_1/ddobsw4z6/image/upload",
      "https://api.cloudinary.com/v1_1/dqzxwktne/image/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
