import UserController from "./UserController";

describe("Add user", () => {
  test("should be able to creat a new user", () => {
    const userController = new UserController;
    const newUser = {
      body: {
        name: "Maicon",
        email: "email@email.com",
        phone: "123",
        password: "123",
        confirmpassword: "123",
      },
    };

    const user = userController().register(newUser);

    expect(user.name).toBe("Maicon");
  });
});
