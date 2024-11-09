/* import { toast } from "react-hot-toast";
import { apiClient, config, multiPartConfig } from "./env";

export default {
  any: async (api, params, data) => {
    if (data instanceof FormData) {
      apiClient.setHeaders((await multiPartConfig()).headers);
    } else {
      apiClient.setHeaders((await config()).headers);
    }

    const response = await apiClient.any({
      method: api.method,
      url: api.url,
      params: params,
      data: data,
    });

    if (response.status === 401) {
      return 401;
    }

    if (response.ok) {
      return response.data;
    }

    if (response.data?.errors) {
      const { errors } = response.data;
      let error = Object.keys(errors)[0];
      toast.dismiss();
      toast.error(response.data?.message ? response.data.message : error);
      return -1;
    }

    if (!response.ok && response.data?.message) {
      toast.dismiss();
      toast.error(response.data.message);
      return -1;
    }
  },
};
 */