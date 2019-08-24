const HOST = process.env.REACT_APP_API_URL || "https://tester-api.nearthlab.com/v1/photos?page=1";

const apis = {
  todos: (id) => `${HOST}/v1/photos${id ? `/${id}` : ""}`,
};

export default apis;