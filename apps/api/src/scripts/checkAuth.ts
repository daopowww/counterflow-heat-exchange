const checkAuth = async () => {
  const registration = await fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: `test_${Date.now()}`,
      password: "testtest",
    }),
  });

  console.log("Регистрация:", registration.status, await registration.json());

  if (!registration.ok) return;

  const setCookie = registration.headers.getSetCookie()[0];

  if (!setCookie) {
    throw new Error("Сервер не прислал cookie");
  }

  const cookie = setCookie.split(";")[0];

  const response = await fetch("http://localhost:3001/api/auth/me", {});

  console.log("Текущий пользователь:", response.status, await response.json());
};

checkAuth().catch(console.error);
