const DetailSkeleton = () => {
  return (
    <div className="mt-3 min-h-[500px] animate-pulse">
      <div>
        <div className="w-[200px] h-[300px] bg-gray-300 mx-auto rounded-md"></div>
        <div className="w-3/4 h-6 bg-gray-300 mt-3 mx-auto rounded"></div>
        <div className="w-1/2 h-4 bg-gray-300 mt-[4px] mx-auto rounded"></div>
        <div className="w-1/3 h-6 bg-gray-300 mt-4 mx-auto rounded"></div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center gap-x-3 w-1/2">
          <div className="w-[48px] h-[48px] bg-gray-300 rounded-md"></div>
          <div className="w-12 h-6 bg-gray-300 rounded"></div>
          <div className="w-[48px] h-[48px] bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-1/2 h-[48px] bg-gray-300 rounded-xl"></div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
