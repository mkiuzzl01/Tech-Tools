import { PropagateLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center pt-24  items-center">
      <PropagateLoader
        color="#2fe630"
        cssOverride={{}}
        loading
        size={11}
        speedMultiplier={2}
      />
    </div>
  );
};

export default Loading;
