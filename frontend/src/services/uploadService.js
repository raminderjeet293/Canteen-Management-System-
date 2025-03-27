import { toast } from "react-toastify";
import axios from "axios";

// export const uploadImage = async (event) => {
//   let toastId = null;

//   const image = await getImage(event);
//   if (!image) return null;

//   const formData = new FormData();
//   formData.append("image", image, image.name);
//   const response = await axios.post("api/upload", formData, {
//     onUploadProgress: ({ progress }) => {
//       if (toastId) toast.update(toastId, { progress });
//       else toastId = toast.success("Uploading...", { progress });
//     },
//   });
//   toast.dismiss(toastId);
//   return response.data.imageUrl;
// };

export const uploadImage = async (event) => {
  let toastId = null;

  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    toast.error("You must be logged in to upload images.");
    return null;
  }

  const image = await getImage(event);
  if (!image) return null;

  const formData = new FormData();
  formData.append("image", image, image.name);

  try {
    const response = await axios.post("api/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // 🔹 Add authentication token
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        const progress = Math.round((loaded / total) * 100);
        if (toastId) toast.update(toastId, { progress });
        else toastId = toast.success("Uploading...", { progress });
      },
    });

    toast.dismiss(toastId);
    return response.data.imageUrl;
  } catch (error) {
    toast.error("Upload failed! Please try again.");
    console.error("Image upload error:", error);
    return null;
  }
};

const getImage = async (event) => {
  const files = event.target.files;

  if (!files || files.length <= 0) {
    toast.warning("Upload file is nott selected!", "File Upload");
    return null;
  }

  const file = files[0];

  if (file.type !== "image/jpeg") {
    toast.error("Only JPG type is allowed", "File Type Error");
    return null;
  }

  return file;
};
