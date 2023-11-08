import { Helmet } from "react-helmet";

function Blog() {
  return (
    <>
      <Helmet>
        <title>JobZen | Blogs</title>
      </Helmet>
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg my-24">
        <h1 className="text-4xl font-semibold text-zinc-800 mb-4">
          Understanding Access Tokens and Refresh Tokens
        </h1>
        <p className="text-gray-800 mb-4">
          Access tokens and refresh tokens are essential concepts in
          authentication and authorization mechanisms, commonly used in web
          applications.
        </p>
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              What is an Access Token?
            </h2>
            <p className="text-gray-800 mb-4">
              An access token is a credential used to gain access to specific
              resources on a server. It is commonly used for user authentication
              and authorization in web applications. Access tokens are usually
              short-lived and expire after a set period.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              What is a Refresh Token?
            </h2>
            <p className="text-gray-800 mb-4">
              A refresh token is a longer-lived token that is used to request a
              new access token after the original access token expires. It helps
              maintain the users session without the need for them to re-enter
              their credentials. Refresh tokens are securely stored and are not
              meant to be exposed to the client-side.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              How Do They Work?
            </h2>
            <p className="text-gray-800 mb-4">
              Access tokens are obtained by the client after successful
              authentication with a server. These tokens are sent with each API
              request to authenticate the client. When the access token expires,
              the client can use the refresh token to request a new access token
              from the server, avoiding the need for the user to log in again.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              Where Should We Store Them on the Client-Side?
            </h2>
            <p className="text-gray-800 mb-4">
              Access tokens should be stored in a secure manner on the
              client-side. Commonly used options for storage include HTTP
              cookies, local storage, or session storage. However, its crucial
              to consider security implications when choosing a storage
              mechanism. Its best to use HttpOnly cookies for access tokens and
              store them in an HttpOnly cookie for added security.
            </p>
          </div>
        </div>
        <h1 className="text-4xl font-semibold text-zinc-800 mb-4 mt-12">
          Understanding Express.js and Nest.js
        </h1>
        <p className="text-gray-800 mb-4">
          Express.js and Nest.js are two popular Node.js frameworks used for
          building web applications and APIs. Lets explore them briefly.
        </p>
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              What is Express.js?
            </h2>
            <p className="text-gray-800 mb-4">
              Express.js is a minimal and flexible Node.js web application
              framework. It simplifies the process of building robust and
              scalable web applications. Express.js provides a set of features
              for routing, middleware, and handling HTTP requests, making it a
              popular choice for building APIs and web servers.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">
              What is Nest.js?
            </h2>
            <p className="text-gray-800 mb-4">
              Nest.js is a progressive Node.js framework for building efficient
              and scalable server-side applications. It is built with TypeScript
              and takes advantage of decorators, dependency injection, and other
              design patterns. Nest.js is known for its modularity and the
              ability to create clean and maintainable code, making it suitable
              for a wide range of projects, from simple APIs to complex
              applications.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
