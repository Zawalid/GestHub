const NoResults = ({ heading, message }) => {
  return (
    <>
      <img src="/images/no_result.png" alt="no results" className="w-[200px]" />
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-text-secondary">
          {heading || "No results found"}
        </h3>
        {message && <p className="text-sm text-text-tertiary">{message}</p>}
      </div>
    </>
  );
};

const Error = ({ heading, message }) => {
  return (
    <>
      <img src="/images/error.png" alt="no results" className="w-14" />
      <div className="space-y-2 mt-3">
        <h3 className="font-semibold text-lg text-red-500">
          {heading || "Something went wrong! Please try again."}
        </h3>
        {message && <p className="text-sm text-red-400">{message}</p>}
      </div>
    </>
  );
};

const Loading = ({size = 'default'}) => {
  const sizes = {
    default : "w-16",
    small : "w-10"
  }
  return (
    <div className={`border-t-4 rounded-full border-primary  animate-spin aspect-square flex justify-center items-center text-yellow-700 ${sizes[size]}`}></div>
  );
};

export function Status({ status, heading, message,size }) {
  const props = { heading, message };

  const statuses = {
    noResults: <NoResults {...props} />,
    error: <Error {...props} />,
    loading: <Loading size={size} />,
  };

  return (
    <div className="flex text-center z-[2] h-full flex-col absolute top-0 w-full items-center justify-center">
      {statuses[status]}
    </div>
  );
}
