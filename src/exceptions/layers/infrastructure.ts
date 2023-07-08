export const InfrastructureException = {
  // Database
  DATABASE_ERROR_TO_CREATE: {
    code: "20",
    message: "Falha ao criar um registro",
  },
  DATABASE_ERROR_TO_GET: {
    code: "21",
    message: "Falha ao buscar um registro",
  },

  // Encryption
  ENCRYPTION_HASHING_ERROR: {
    code: "22",
    message: "Falha ao criptografar a senha",
  },
  ENCRYPTION_COMPARING_ERROR: {
    code: "23",
    message: "Falha ao comparar a senha",
  },
};
