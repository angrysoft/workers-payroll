const apiCall = async (url:string, method:string ="GET", data?:any) => {
  const token:string = localStorage.getItem("token") || "";
  let results: any = {};
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Authorization": token,
      },
      body: data,
    });
    if (response.ok) {
      results = await response.json();
    }
  } catch (err) {
    console.error(err);
  }
  return results;
};

export {apiCall};
