const LoadingBar: React.FC = () => {
  return (
    <div className="my-4 text-center">
      <div
        role="status"
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p className="text-sm text-gray-600 mt-2">Loading...</p>
    </div>
  );
};

export default LoadingBar;
