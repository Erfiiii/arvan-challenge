import axios from "axios";

export class HttpService {
  static processHeader(header) {
    const requestHeader = header ? header : {};
    if (localStorage.getItem("token")) {
      requestHeader.Authorization = `Token ${localStorage.getItem("token")}`;
    }
    requestHeader["Content-Type"] = "application/json";
    return requestHeader;
  }

  static async getRequest(path, data, header) {
    let requestHeader = HttpService.processHeader(header);

    try {
      let res = await axios.get(path, { headers: requestHeader });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async postRequest(path, data, header) {
    let requestHeader = HttpService.processHeader(header);

    try {
      let res = await axios.post(path, data, { headers: requestHeader });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async putRequest(path, data, header) {
    let requestHeader = HttpService.processHeader(header);

    try {
      let res = await axios.put(path, data, { headers: requestHeader });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRequest(path, header) {
    let requestHeader = HttpService.processHeader(header);

    try {
      let res = await axios.delete(path, { headers: requestHeader });
      return res;
    } catch (error) {
      throw error;
    }
  }
}
