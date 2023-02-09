const generateConfig=(url,accessToken)=>{
    return {
        method: "get",
        url: url,
        headers: {
          Authorization: `Bearer ${accessToken} `,
          "Content-type": "application/json"
        },
      };
}

module.exports={ generateConfig }