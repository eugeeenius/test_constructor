export default {
  AddUser: `
    INSERT INTO test_constructor.User (email, password)
    VALUES(?, ?);
  `,
  GetUserById: `
    SELECT id, email, password FROM test_constructor.User 
    WHERE id = ? 
  `,
  GetUserByEmail: `
    SELECT id, email, password FROM test_constructor.User 
    WHERE email = ? 
  `,
}
