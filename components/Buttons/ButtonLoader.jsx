const ButtonLoader = () => {
  return (
    <div className="bg-yellow text-brown-100 font-bold py-4 px-6 rounded-2xl cursor-not-allowed">
      <span className="flex items-center">
        <span className="btn-spin-loader mr-4" style={{ borderTopColor: '#5b4850' }}></span>
        Loading...
      </span>
    </div>
  );
};

export default ButtonLoader;
