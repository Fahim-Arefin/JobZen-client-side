function FoundNoProduct() {
  return (
    <div
      className="container mx-auto mt-16 text-rose-500 p-6
      flex flex-col justify-center items-center space-y-6"
    >
      <div className="w-full md:w-[300px] h-[300px]">
        <img className="w-full h-full" src="/no_data_found.svg" alt="" />
      </div>
      <div className="text-xl md:text-xl font-semibold text-center">
        No Data is available at these moment
      </div>
    </div>
  );
}

export default FoundNoProduct;
