import { Link, useNavigate, useRouteError } from "react-router-dom";

function Error({ children }) {
  const navigate = useNavigate();

  //if any error occur this hook will called and give error obj
  const error = useRouteError();
  //   console.log(error);
  //   error.data --> will get the no route matched error message
  //   error.message --> will get the fetching related error message
  return (
    <>
      <div className="flex min-h-screen items-start justify-center ">
        <div className="font-semibold mt-24 h-auto w-[95%] space-y-4 rounded-xl bg-gray-200 p-12 text-center text-rose-600 md:w-[70%] lg:w-[60%] xl:w-[40%] ">
          {error?.message && (
            <h1 className="text-3xl md:text-4xl">Something Went wrong 😥</h1>
          )}
          <p className="text-xl md:text-2xl text-rose-600">
            {children || error?.message}
          </p>
          <div className="text-white bg-[#15b7b9] w-fit mx-auto px-4 py-2 rounded-md hover:bg-[#15A7b9] active:bg-[#15b7b9] transition-all duration-150 cursor-pointer">
            <Link onClick={() => navigate(-1)}>&larr; go back</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
