const apiCall = async (url:string, method:string ="GET", data?:any) => {
  const token:string = localStorage.getItem("token") || "";
  let results: any = {};
  let error: string = "";
  let code: number = 0;
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Authorization": token,
      },
      body: data,
    });
    code = response.status;
    if (response.ok) {
      results = await response.json();
    }
  } catch (err) {
    console.error(err);
    error = (err as Error).toString();
  }
  return [results, error, code];
};

export {apiCall};
