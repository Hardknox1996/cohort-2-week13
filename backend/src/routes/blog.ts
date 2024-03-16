import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  createBlogInp,
  updateBlogInp,
} from "@shekharchavan/medium-commons-learning";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const header = (await c.req.header("authorization")) || "";
  //Bearer token
  const token = header.split(" ")[1];
  // const token = header

  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "Unothrized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Invalid Token" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = createBlogInp.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Data",
    });
  }

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = updateBlogInp.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Data",
    });
  }

  const blog = await prisma.post.update({
    where: {
      id: body.id,
      //   authorId: c.get('userId')
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

//Pagination required
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany({
      select:{
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while fetching blog post" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select:{
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });

    return c.json({
      id: blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({ error: "Error while fetching blog post" });
  }
});
