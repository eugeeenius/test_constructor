export default {
  SaveToken: `
    INSERT INTO test_constructor.Token (userId, refreshToken)
    VALUES(?, ?);
  `,
  UpdateToken: `
    UPDATE test_constructor.Token
    SET RefreshToken = ?
    WHERE UserId = ?
  `,
  FindUserToken: `
    SELECT UserId, RefreshToken FROM test_constructor.Token 
    WHERE UserId = ?
  `
}
