import { AxiosInstance } from "../util/AxiosInstance";





export const getAllProducts = async () => {
  const getUrl = "https://boppotech-admin.github.io/react-task-json.github.io/reactjob.json";

  try {
    const response = await AxiosInstance.get(getUrl);
    return response;
  } catch (error) {
    //console.log(error);
    return error.response;
  }
};