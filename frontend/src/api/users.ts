// src/api/users.ts
export const createUser = async (name: string, email: string, password: string) => {
  const res = await fetch("http://localhost:4000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error creando usuario");
  }

  return res.json();
};
