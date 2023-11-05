function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-300/30 backdrop-blur-sm">
      <span className="loading loading-ring loading-lg"></span>;
    </div>
  );
}

export default Spinner;
