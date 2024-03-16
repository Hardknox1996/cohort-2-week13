import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signUpInp, signInInp } from "@shekharchavan/medium-commons-learning";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signUpInp.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputes are not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const payload = {
      id: user.id,
      type: "SignUp",
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    return c.text(token);
  } catch (e) {
    c.status(401);
    return c.json({ error: "Invalid" });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = signInInp.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputes are not correct",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "Incorrect Credentials" });
    }

    const payload = {
      id: user.id,
      type: "LogIn",
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    return c.text(token);
  } catch (e) {
    c.status(401);
    return c.json({ error: "Invalid" });
  }
});
