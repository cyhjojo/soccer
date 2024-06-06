import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";


export interface Fb {
  data: String;
  feedback: String;
}


const Api = import.meta.env.VITE_APP_API;

export const commonStore = () => {
  let errors = {};

  function setError(err: any) {
    const error = err?.data;
    console.log(error, error?.code, "--------11");
    errors = { ...error };
    if (error?.code == 401 || error?.code == 403 || error?.code == 40001) {
      JwtService.destroyToken();
      localStorage.removeItem("id_token");
      localStorage.removeItem("user_info");
      setTimeout(() => {
        window.location.href = "#/sign-in";
      }, 1000);
    }
  }

  function handleResult(res: any) {
    const { data } = res;
    if (!data.code) {
      return data; // 返回一个成功的 Promise，即调用 resolve(data)
    } else if (data.code == 40001 || data.code == 401 || data.code == 403) {
      JwtService.destroyToken();
      localStorage.removeItem("id_token");
      localStorage.removeItem("user_info");
      setTimeout(() => {
        window.location.href = "#/sign-in";
      }, 1000);
    } else {
      throw data; // 抛出一个错误对象，即调用 reject(data)
    }
  }

  function preprocessing(res: any) {
    if (res.status === 200 && res.data) {
      return res.data;
    }
    return res;
  }

  /**
   * fetch Matches
   * @returns
   */
  function fetchMatches(params) {
    return ApiService.query(`${Api}/matches`, {params})
      .then((res) => handleResult(res))
      .catch(({ response }) => {
        setError(response);
      });
  }


  /**
   * fetchScores
   * @param match_ids 参数  match_ids
   * @returns
   */
  function fetchScores(match_ids: string[], is_half: boolean) {
    return ApiService.post(`${Api}/scores`, {
      match_ids,
      is_half
    })
      .then((res) => handleResult(res))
      .catch(({ response }) => {
        setError(response);
      });
  }


  return {
    errors,
    setError,
    fetchMatches,
    fetchScores
  };
};
